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

      <div className="blackbox">
        <div className="highlighted-phase">
          <PhaseCard
            title="Full Compilation"
            description="Run all phases together"
            onClick={() => navigate('/compile')}
            bgColor="LightGray"
            textColor="black"
            className="highlight-card"
          />
        </div>

        <div className="phase-container">
          <PhaseCard
            title="Lexical Analysis"
            description="Convert code to tokens"
            onClick={() => navigate('/lexical')}
            bgColor="SlateBlue"
            textColor="#1e293b"  
            className="phase-card lexical"
          />
          <PhaseCard
            title="Syntax Analysis"
            description="Build parse trees"
            onClick={() => navigate('/syntax')}
            bgColor="MediumSeaGreen"
            textColor="#065f46"  
            className="phase-card syntax"
          />
          <PhaseCard
            title="Semantic Analysis"
            description="Check type consistency and undeclared variables"
            onClick={() => navigate('/semantic')}
            bgColor="DodgerBlue"
            textColor="#1e40af"  
            className="phase-card semantic"
          />
          <PhaseCard
            title="Intermediate Code"
            description="Generate 3-address code"
            onClick={() => navigate('/intermediate')}
            bgColor="Violet"
            textColor="#78350f"  
            className="phase-card intermediate"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
