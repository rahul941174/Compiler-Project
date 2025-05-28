import React from 'react';
import SemanticTool from '../components/SemanticTool';

function SemanticPage() {
  return (
    <div className="semantic-page" style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h2>Semantic Analysis</h2>
      <p>
        This phase checks the code for semantic consistency — such as undeclared variables,
        type mismatches, or invalid operations.
      </p>
      <SemanticTool />
    </div>
  );
}

export default SemanticPage;
