import React from 'react';
import './PhaseCard.css';

function PhaseCard({ title, description, onClick, bgColor, textColor, className = '' }) {
  const style = {
    backgroundColor: bgColor || '#f9f9f9',
    color: textColor || 'black',
  };

  return (
    <div className={`phase-card ${className}`} onClick={onClick} style={style}>
      <h3 className="phase-title">{title}</h3>
      <p className="phase-description">{description}</p>
    </div>
  );
}

export default PhaseCard;
