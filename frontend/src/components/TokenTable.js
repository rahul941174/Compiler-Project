import React from 'react';

function TokenTable({ tokens }) {
  if (!tokens.length) return null;

  return (
    <div style={{ marginTop: '30px' }}>
      <h4>Lexical Tokens</h4>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        textAlign: 'left',
      }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Type</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{token.type}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{token.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TokenTable;
