const { summary, isLoading, error, generateSummary } = useGeminiSummary();
// ...
<button onClick={generateSummary} disabled={isLoading}>
  {isLoading ? 'Gerando...' : 'Gerar Resumo'}
</button>