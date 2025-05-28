// components/ResultTable.jsx

import React from 'react';

function ResultTable({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div style={{ marginTop: '30px' }}>
      <h4>Semantic Analysis Results</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={cellStyle}>Statement</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Error</th>
          </tr>
        </thead>
        <tbody>
          {results.map((res, index) => (
            <tr key={index}>
              <td style={cellStyle}>{res.code}</td>
              <td style={{ ...cellStyle, color: res.status === '✅ Valid' ? 'green' : 'red' }}>
                {res.status}
              </td>
              <td style={cellStyle}>{res.error || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'left',
};

export default ResultTable;
