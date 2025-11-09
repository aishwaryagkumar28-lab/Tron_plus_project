🧠 Tron+ — AI-Powered Document Q&A Assistant
🚀 Overview

Tron+ is an intelligent document assistant that lets users upload PDFs and ask questions about their content.
It uses OpenAI’s language models for understanding and Pinecone for semantic vector search, allowing context-aware answers based on the document.

This project demonstrates how AI + vector databases can make large documents interactive and easy to explore.

⚙️ Features

✅ Upload and process any PDF document
✅ Extract and embed document text using OpenAI embeddings
✅ Store embeddings in Pinecone for semantic search
✅ Ask natural language questions and get relevant answers
✅ Fast and simple user interface built with HTML, CSS, and JavaScript
✅ Node.js backend with Express and REST API endpoints

🧩 Tech Stack
Component	Technology
Frontend-	HTML, CSS, JavaScript
Backend-	Node.js + Express
AI Model-	OpenAI GPT (via API)
Embeddings-	text-embedding-3-small
Vector Database-	Pinecone
File Handling-	pdf-parse, multer
Environment Config-	dotenv

⚙️ Setup & Run Locally

Clone the repo

git clone https://github.com/yourusername/tron-plus.git
cd tron-plus


Configure API keys
In backend/.env, add your credentials:

OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=us-east1-gcp
PINECONE_INDEX=tron-index
PORT=3000


Install dependencies

cd backend
npm install


Run backend

node server.js


Run frontend

cd ../frontend
python -m http.server 5500


Open your browser at http://localhost:5500

Upload a PDF → Ask questions → Get instant AI answers!

🧠 How It Works

The uploaded PDF is parsed and split into smaller text chunks.

Each chunk is converted into vector embeddings using OpenAI.

These embeddings are stored in Pinecone, enabling fast semantic similarity search.

When a user asks a question, the system finds the most relevant document chunks,
sends them to the OpenAI model, and generates a precise, context-aware answer.

🛠️ Future Enhancements

Support for multiple document uploads

Streamed AI responses for chat-like experience

Integration with other vector DBs (FAISS, Chroma)

PDF highlighting for referenced content

User login and conversation history
