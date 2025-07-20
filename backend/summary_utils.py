import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_summary(transcript: list) -> dict:
    try:
        full_text = " ".join(transcript)
        prompt = (
            "You are a helpful assistant. Summarize the following YouTube transcript "
            "in concise bullet points:\n\n" + full_text
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
        )

        summary = response.choices[0].message.content.strip()
        return {"success": True, "summary": summary}

    except Exception as e:
        return {"success": False, "error": str(e)}
