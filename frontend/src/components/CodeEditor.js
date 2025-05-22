import React from 'react';

function CodeEditor({ code, onCodeChange }) {
  return (
    <textarea
      value={code}
      onChange={(e) => onCodeChange(e.target.value)}
      rows={10}
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontFamily: 'monospace',
        fontSize: '14px',
        resize: 'vertical',
      }}
    />
  );
}

export default CodeEditor;
