import React from 'react';
import './SyntaxReport.css';

function SyntaxReport({ report }) {
  if (!report || report.length === 0) {
    return null;
  }

  return (
    <div className="syntax-report">
      <h2>Syntax Analysis Report</h2>
      <table>
        <thead>
          <tr>
            <th>Line</th>
            <th>Code</th>
            <th>Status</th>
            <th>Type</th>
            <th>Variable</th>
            <th>Value</th>
            <th>Error</th>
          </tr>
        </thead>
        <tbody>
          {report.map((line, index) => (
            <tr key={index} className={line.status.includes('❌') ? 'error' : 'valid'}>
              <td>{line.line}</td>
              <td>{line.code}</td>
              <td>{line.status}</td>
              <td>{line.type || '-'}</td>
              <td>{line.variable || '-'}</td>
              <td>{line.value || '-'}</td>
              <td>{line.error || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SyntaxReport;
