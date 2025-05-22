import React from 'react';
import LexicalTool from '../components/LexicalTool';

function Lexical() {
  return (
    <div className="lexical-page" style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h2>Lexical Analysis</h2>
      <p>
        In this phase, the source code is divided into tokens. Tokens are the smallest units like
        keywords (`int`, `if`), identifiers (`a`, `count`), symbols (`=`, `;`), etc.
      </p>
      <LexicalTool />
    </div>
  );
}

export default Lexical;
