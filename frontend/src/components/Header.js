import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Compiler Simulator</h1>
        </Link>
        
        <nav>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/lexical" 
            className={`nav-link ${location.pathname === '/lexical' ? 'active' : ''}`}
          >
            Lexical
          </Link>
          <Link 
            to="/syntax" 
            className={`nav-link ${location.pathname === '/syntax' ? 'active' : ''}`}
          >
            Syntax
          </Link>
          <Link 
            to="/intermediate" 
            className={`nav-link ${location.pathname === '/intermediate' ? 'active' : ''}`}
          >
            Intermediate
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;