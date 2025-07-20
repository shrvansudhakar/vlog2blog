"use client";

import React, { useState } from "react";
import "./globals.css"; // Optional: keep if you're using global styles

export default function Home() {
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [transcript, setTranscript] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [source, setSource] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTranscript([]);
        setError("");
        setSource("");

        try {
            const response = await fetch("http://localhost:8000/transcript", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ video_url: youtubeUrl }), //
            });

            const data = await response.json();
            console.log("Backend response:", data);

            if (data.success && data.transcript.length > 0) {
                setTranscript(data.transcript);
                setSource(data.source);
            } else {
                setError("Transcript not found or empty.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="container">
            <h1 className="title">Skimlify</h1>

            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    placeholder="Enter YouTube URL"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="input"
                />
                <button type="submit" className="button">
                    Get Transcript
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            {transcript.length > 0 && (
                <div className="transcript">
                    <h2>Transcript Source: {source}</h2>
                    <ul>
                        {transcript.map((line, idx) => (
                            <li key={idx}>{line}</li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    );
}
