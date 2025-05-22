import React, { useState } from 'react';
import CodeEditor from './CodeEditor';

function SyntaxTool() {
  const [code, setCode] = useState(`int a = 10;\nfloat b = 20.5;`);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSyntaxCheck = async () => {
    try {
      const res = await fetch('http://localhost:5000/syntax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      setResult(data.message);
      setError('');
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto' }}>
      <h3>Syntax Analysis</h3>
      <p>Enter C-like code to check syntax validity.</p>
      <CodeEditor code={code} onCodeChange={setCode} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={handleSyntaxCheck}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0077cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Run Syntax Analysis
        </button>
      </div>
      {result && <p style={{ color: 'green', marginTop: '20px' }}>{result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SyntaxTool;
