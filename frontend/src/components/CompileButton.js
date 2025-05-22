import React from 'react';

function CompileButton({ onCompile }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <button onClick={onCompile} style={{ padding: '10px 20px' }}>
        Compile Code
      </button>
    </div>
  );
}

export default CompileButton;
