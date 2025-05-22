import React, { useState } from 'react';

function IntermediateCode() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState([]);

  const handleGenerate = async () => {
    const res = await fetch('http://localhost:5000/intermediate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setOutput(data.code || []);
  };

  return (
    <div className="intermediate-page" style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h2>Intermediate Code Generation</h2>
      <p>
        Intermediate code is a simplified version of source code. It sits between high-level
        code and machine code. For example:
      </p>
      <pre>
        a = b + c * d;{'\n'}
        → t1 = c * d{'\n'}
        → a = b + t1
      </pre>
      <p>This phase helps in optimization and code generation for multiple platforms.</p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        placeholder="Enter C code here..."
        style={{ width: '100%', padding: '10px', fontSize: '16px', fontFamily: 'monospace', marginTop: '20px' }}
      />
      <br />
      <button
        onClick={handleGenerate}
        style={{
          padding: '10px 20px',
          marginTop: '10px',
          fontSize: '16px',
          backgroundColor: '#f59e0b',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Generate Intermediate Code
      </button>

      {output.length > 0 && (
        <div style={{ marginTop: '20px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px' }}>
          <h3>Generated 3-Address Code:</h3>
          <pre style={{ fontFamily: 'monospace', fontSize: '16px' }}>
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}

export default IntermediateCode;
