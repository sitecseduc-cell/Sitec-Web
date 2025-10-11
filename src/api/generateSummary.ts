// src/api/generateSummary.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Dados mockados (no mundo real, viriam de um banco de dados)
const mockRecentProcesses = [/* ... seus dados mockados aqui ... */];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas o método POST é permitido' });
  }

  // A chave da API é lida das Environment Variables do servidor, NUNCA do frontend
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Chave da API não configurada no servidor.' });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const systemPrompt = "Você é um consultor especialista em gestão pública...";
  const processDataForPrompt = mockRecentProcesses.map(p => `- ID: ${p.id}, Solicitante: ${p.solicitante}, Status: ${p.status}`).join('\n');
  const userQuery = `Analise os seguintes processos e forneça um resumo gerencial:\n${processDataForPrompt}`;

  try {
    const result = await model.generateContent([systemPrompt, userQuery]);
    const response = result.response;
    const text = response.text();

    res.status(200).json({ summary: text });
  } catch (error) {
    console.error("Erro na chamada à API Gemini:", error);
    res.status(500).json({ error: 'Erro ao se comunicar com a API do Gemini.' });
  }
}