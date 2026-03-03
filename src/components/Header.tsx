import React from 'react';
import { Video } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-20 lg:px-40 border-b border-white/5 bg-[#0a0f18]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2 text-blue-500">
        <div className="bg-blue-500/10 p-1.5 rounded-lg">
          <Video className="w-6 h-6" />
        </div>
        <h2 className="text-white text-xl font-bold tracking-tight">TubeScript</h2>
      </div>
      
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">How it Works</a>
          <a href="#" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-slate-300 hover:text-white text-sm font-bold px-4 py-2 transition-colors">Login</button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};
