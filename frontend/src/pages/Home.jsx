import React from 'react';
import { useNavigate } from 'react-router-dom';
import PhaseCard from '../components/PhaseCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="hero">
        <h2>Compiler Phase Simulator</h2>
        <p>Interactive tool to understand compiler construction</p>
      </div>

      <div className="phase-container">
        <PhaseCard
          title="Lexical Analysis"
          description="Convert code to tokens"
          onClick={() => navigate('/lexical')}
          color="#4f46e5"
        />
        <PhaseCard
          title="Syntax Analysis"
          description="Build parse trees"
          onClick={() => navigate('/syntax')}
          color="#10b981"
        />
        <PhaseCard
          title="Intermediate Code"
          description="Generate 3-address code"
          onClick={() => navigate('/intermediate')}
          color="#f59e0b"
        />
      </div>
    </div>
  );
}

export default Home;