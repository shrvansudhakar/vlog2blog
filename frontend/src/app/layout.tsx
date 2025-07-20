// frontend/pages/index.tsx
"use client";

import { useState } from "react";

export default function Home() {
    const [videoUrl, setVideoUrl] = useState("");
    const [summary, setSummary] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        setSummary(null);

        try {
            // Get transcript
            const transcriptRes = await fetch(
                "http://localhost:8000/transcript",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ video_url: videoUrl }),
                }
            );

            const transcriptData = await transcriptRes.json();

            if (!transcriptData.success) {
                setError(transcriptData.error || "Transcript fetch failed.");
                setLoading(false);
                return;
            }

            // Get summary
            const summaryRes = await fetch("http://localhost:8000/summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ transcript: transcriptData.transcript }),
            });

            const summaryData = await summaryRes.json();

            if (!summaryData.success) {
                setError("Summary generation failed.");
                setLoading(false);
                return;
            }

            // Set summary
            const bulletPoints = summaryData.summary
                .split("\n")
                .map((point: string) => point.replace(/^- /, "").trim())
                .filter((point: string) => point.length > 0);

            setSummary(bulletPoints);
        } catch (err) {
            setError("Something went wrong.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>🎯 Skimlify</h1>
            <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Enter YouTube link"
                style={{
                    padding: "0.5rem",
                    width: "300px",
                    marginRight: "1rem",
                }}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : "Get Summary"}
            </button>

            {error && (
                <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
            )}

            {summary && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>📌 Summary</h2>
                    <ul>
                        {summary.map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                </div>
            )}
        </main>
    );
}
