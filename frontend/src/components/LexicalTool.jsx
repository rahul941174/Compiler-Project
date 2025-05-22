import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import TokenTable from './TokenTable';

function LexicalTool() {
  const [code, setCode] = useState(`int a = 10;\nfloat b = 20.5;`);
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');

  const handleLexical = async () => {
    try {
      const res = await fetch('http://localhost:5000/lexical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setTokens(data.tokens || []);
      setError('');
    } catch (err) {
      setError('Error communicating with server. Please check backend.');
      console.error(err);
    }
  };

  return (
    <div className="lexical-tool" style={{ maxWidth: '900px', margin: 'auto' }}>
      <h3>Enter C code for Lexical Analysis</h3>
      <CodeEditor code={code} onCodeChange={setCode} />

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handleLexical} style={{
          padding: '10px 20px',
          backgroundColor: '#0077cc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Run Lexical Analysis
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TokenTable tokens={tokens} />
    </div>
  );
}

export default LexicalTool;
