import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateGeminiContent, evaluatePromptQuality, generateInnovationPlan } from './src/services/geminiServer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

app.post('/api/gemini/generate', async (req, res) => {
  const { prompt, systemInstruction } = req.body;
  const result = await generateGeminiContent(prompt, systemInstruction);
  res.json(result);
});

app.post('/api/gemini/evaluate-prompt', async (req, res) => {
  const { promptText } = req.body;
  const result = await evaluatePromptQuality(promptText);
  res.json(result);
});

app.post('/api/gemini/innovation-plan', async (req, res) => {
  const result = await generateInnovationPlan(req.body);
  res.json(result);
});

// Serve built static assets if available
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
