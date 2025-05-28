// components/SemanticTool.jsx

import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import ResultTable from './ResultTable';

function SemanticTool() {
  const [code, setCode] = useState(`int a = 10;\nfloat b = 20.5;\na = b;`);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSemantic = async () => {
    try {
      const res = await fetch('http://localhost:5000/semantic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setResults(data.results || []);
      setError('');
    } catch (err) {
      setError('Error communicating with server. Please check backend.');
      console.error(err);
    }
  };

  return (
    <div className="semantic-tool" style={{ maxWidth: '900px', margin: 'auto' }}>
      <h3>Enter C code for Semantic Analysis</h3>
      <CodeEditor code={code} onCodeChange={setCode} />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handleSemantic} style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Run Semantic Analysis
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ResultTable results={results} />
    </div>
  );
}

export default SemanticTool;
