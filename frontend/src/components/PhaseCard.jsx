import React from 'react';
import './PhaseCard.css';

function PhaseCard({ title, description, onClick, color }) {
  return (
    <div className="phase-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button 
        className="phase-button" 
        style={{ backgroundColor: color }}
      >
        Explore
      </button>
    </div>
  );
}

export default PhaseCard;