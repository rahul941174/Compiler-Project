import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lexical from './pages/Lexical';
import Syntax from './pages/Syntax';
import IntermediateCode from './pages/IntermediateCode';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lexical" element={<Lexical />} />
        <Route path="/syntax" element={<Syntax />} />
        <Route path="/intermediate" element={<IntermediateCode />} />
      </Routes>
    </div>
  );
}

export default App;
