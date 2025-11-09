import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import dotenv from 'dotenv';
import fs from 'fs';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = await pinecone.index(process.env.PINECONE_INDEX || "tron-index");

app.post('/upload', upload.single('file'), async (req, res) => {
  const dataBuffer = fs.readFileSync(req.file.path);
  const pdfData = await pdfParse(dataBuffer);
  const text = pdfData.text.replace(/\n/g, ' ');
  const chunks = text.match(/.{1,1000}/g);

  for (const chunk of chunks) {
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
    });
    await index.upsert([{ id: `chunk-${Math.random()}`, values: embeddingResponse.data[0].embedding, metadata: { text: chunk } }]);
  }
  fs.unlinkSync(req.file.path);
  res.json({ message: 'PDF processed and stored in Pinecone.' });
});

app.post('/query', async (req, res) => {
  const { question } = req.body;
  const queryEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const queryResponse = await index.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 3,
    includeMetadata: true,
  });

  const context = queryResponse.matches.map(m => m.metadata.text).join("\n");
  const answerPrompt = `Answer this question based on the following context:\n${context}\nQuestion: ${question}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: answerPrompt }],
  });

  res.json({ answer: completion.choices[0].message.content });
});

app.listen(process.env.PORT || 3000, () => console.log("Tron+ backend running on port 3000"));
