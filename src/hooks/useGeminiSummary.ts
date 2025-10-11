// src/hooks/useGeminiSummary.ts
import { useState } from 'react';

export const useGeminiSummary = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      // A chamada agora é para o nosso backend, não para a API do Google
      const response = await fetch('/api/generateSummary', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar resumo a partir do backend.');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
        if (err instanceof Error) {
             setError(err.message);
        } else {
             setError("Ocorreu um erro desconhecido.");
        }
    } finally {
      setIsLoading(false);
    }
  };

  return { summary, isLoading, error, generateSummary };
};