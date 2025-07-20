from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

def extract_video_id(url: str) -> str:
    # Works with various YouTube URL formats
    import re
    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(pattern, url)
    if not match:
        raise ValueError("Invalid YouTube URL")
    return match.group(1)

def get_transcript(video_url: str) -> dict:
    video_id = extract_video_id(video_url)
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        return {
            "success": True,
            "source": "YouTube Captions",
            "transcript": [entry["text"] for entry in transcript_list]
        }
    except (TranscriptsDisabled, NoTranscriptFound):
        return {
            "success": False,
            "error": "Transcript not available for this video."
        }
