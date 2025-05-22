import React, { useState } from 'react';
import SyntaxReport from '../components/SyntaxReport';

function SyntaxPage() {
  const [code, setCode] = useState('');
  const [report, setReport] = useState([]);

  const handleSyntaxCheck = async () => {
    const res = await fetch('http://localhost:5000/syntax', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    console.log("syntax analysis");
    const data = await res.json();
    setReport(data.report);
  };

  return (
    <div className="syntax-page" style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h2>Syntax Analysis</h2>
      <p>
        In this phase, the code is parsed to check for correct grammar and structure. It ensures
        that declarations, loops, assignments, etc., follow valid syntax rules.
      </p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="10"
        cols="80"
        placeholder="Enter C code here..."
        style={{ width: '100%', padding: '10px', fontSize: '16px', fontFamily: 'monospace', marginTop: '10px' }}
      />
      <br />
      <button
        onClick={handleSyntaxCheck}
        style={{
          padding: '10px 20px',
          marginTop: '10px',
          fontSize: '16px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Run Syntax Analysis
      </button>

      <SyntaxReport report={report} />
    </div>
  );
}

export default SyntaxPage;
