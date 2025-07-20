from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transcript_utils import get_transcript
from summary_utils import generate_summary

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranscriptRequest(BaseModel):
    video_url: str

class SummaryRequest(BaseModel):
    transcript: list[str]

@app.post("/transcript")
async def transcript_handler(data: TranscriptRequest):
    return get_transcript(data.video_url)

@app.post("/summary")
async def summary_handler(data: SummaryRequest):
    return generate_summary(data.transcript)
