# VLOG2BLOG 📝

**VLOG2BLOG** is a full-stack AI-powered web app that transforms YouTube videos into concise, human-like blog posts. Just paste a YouTube link, and get a structured blog generated using the video’s transcript.

## ✨ Features

-   🔗 Paste any public YouTube link
-   🧠 Automatically extracts transcript using YouTube Transcript API
-   ✍️ Uses OpenAI GPT model to generate a clean blog post
-   ⚡ Fast, responsive frontend built with Next.js and TypeScript
-   🔄 Asynchronous API calls with loading & error handling
-   🧪 API tested with Postman for stability and performance
-   📚 Clean monorepo structure: FastAPI backend + Next.js frontend

## 🛠️ Tech Stack

| Layer    | Technologies Used                                   |
| -------- | --------------------------------------------------- |
| Frontend | Next.js, TypeScript, React, CSS                     |
| Backend  | Python, FastAPI, OpenAI API, youtube-transcript-api |
| Tools    | Postman, VS Code, Git, REST APIs                    |

## 🚀 Getting Started

### Requirements

-   Node.js (>=18)
-   Python 3.9+
-   `pip`, `npm` or `yarn`

### 1. Clone the Repository

```bash
git clone https://github.com/shrvansudhakar/vlog2blog.git
cd vlog2blog
```

### 2. Setup Backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Setup Frontend

```
cd frontend
npm install
npm run dev
```

### 4. Test

Frontend: http://localhost:3000 <br>
Backend: http://localhost:8000
