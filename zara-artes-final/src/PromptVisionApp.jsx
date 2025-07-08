import React, { useState } from 'react';

export default function PromptVisionApp() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Selecione uma imagem');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://promptvision-api-ia.hf.space/analisar', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setPrompt(data.prompt);
    } catch (err) {
      alert('Erro ao enviar imagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Zara Artes – IA que descreve sua imagem</h1>

      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Analisando imagem...' : 'Gerar Prompt'}
      </button>

      {prompt && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow w-full max-w-xl text-center">
          <h2 className="font-semibold text-lg mb-2">Prompt Gerado:</h2>
          <p className="text-gray-700">{prompt}</p>
        </div>
      )}
    </div>
  );
}
