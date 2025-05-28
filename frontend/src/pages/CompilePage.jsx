import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import TokenTable from '../components/TokenTable';
import ResultTable from '../components/ResultTable';
import './CompilePage.css'; // Add this new CSS file

function CompilePage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({
    lexical: true,
    syntax: false,
    semantic: false,
    intermediate: false,
    target: false,
  });

  const handleCompile = async () => {
    try {
      const res = await fetch('http://localhost:5000/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setResult(data);
      setError('');
    } catch (err) {
      setError('Error communicating with server. Please check backend.');
      setResult(null);
      console.error(err);
    }
  };

  const tokens = result?.tokens || [];
  const syntax = result?.parseTree;
  const semantic = result?.semanticResult?.report || [];
  const intermediate = result?.intermediateCode?.code || [];
  const target = result?.targetCode?.code || [];

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="compile-container">
      {/* LEFT PANEL */}
      <div className="input-section">
        <h2>Full Compilation</h2>
        <FileUploader onFileLoad={setCode} />

        <textarea
          rows={15}
          className="code-area"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your C code here..."
        />

        <button className="compile-button" onClick={handleCompile}>
          Compile Code
        </button>

        {error && <p className="error-msg">{error}</p>}
      </div>

      {/* RIGHT PANEL */}
      <div className="output-section">
        <h2>Compilation Output</h2>

        {/* Lexical */}
        <div className="output-block">
          <div className="dropdown-header" onClick={() => toggleSection('lexical')}>
            Lexical Tokens
          </div>
          {expanded.lexical && (
            tokens.length > 0 ? <TokenTable tokens={tokens} /> : <p>No lexical tokens generated.</p>
          )}
        </div>

        {/* Syntax */}
        <div className="output-block">
          <div className="dropdown-header" onClick={() => toggleSection('syntax')}>
            Syntax Parse Tree
          </div>
          {expanded.syntax && (
            syntax ? (
              <pre className="output-box">{JSON.stringify(syntax, null, 2)}</pre>
            ) : (
              <p>No syntax parse tree available.</p>
            )
          )}
        </div>

        {/* Semantic */}
        <div className="output-block">
          <div className="dropdown-header" onClick={() => toggleSection('semantic')}>
            Semantic Analysis
          </div>
          {expanded.semantic && (
            semantic.length > 0 ? <ResultTable results={semantic} /> : <p>No semantic analysis results.</p>
          )}
        </div>

        {/* Intermediate Code */}
        <div className="output-block">
          <div className="dropdown-header" onClick={() => toggleSection('intermediate')}>
            Intermediate Code
          </div>
          {expanded.intermediate && (
            intermediate.length > 0 ? (
              <pre className="output-box">{intermediate.join('\n')}</pre>
            ) : (
              <p>No intermediate code generated.</p>
            )
          )}
        </div>

        {/* Target Code */}
        <div className="output-block">
          <div className="dropdown-header" onClick={() => toggleSection('target')}>
            Target Code
          </div>
          {expanded.target && (
            target.length > 0 ? (
              <pre className="output-box">{target.join('\n')}</pre>
            ) : (
              <p>No target code generated.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CompilePage;
