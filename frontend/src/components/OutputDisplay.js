import React from 'react';

function OutputDisplay({ output }) {
  return (
    <div style={{ margin: '20px auto', width: '80%' }}>
      <h3>Backend Response:</h3>
      <pre style={{ background: '#f0f0f0', padding: '10px' }}>{output}</pre>
    </div>
  );
}

export default OutputDisplay;
