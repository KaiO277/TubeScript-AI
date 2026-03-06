import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0a0f18] text-slate-200 font-sans selection:bg-blue-500/30">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
