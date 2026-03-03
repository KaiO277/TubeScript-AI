import React from 'react';
import { Video, Globe, Mail, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/5 py-12 px-6 md:px-20 lg:px-40 flex flex-col md:flex-row justify-between items-center gap-8 bg-black/20">
      <div className="flex items-center gap-2 text-blue-500">
        <Video className="w-5 h-5" />
        <h2 className="text-white font-bold tracking-tight">TubeScript</h2>
      </div>
      
      <p className="text-sm text-slate-500">
        © {new Date().getFullYear()} TubeScript AI. All rights reserved.
      </p>
      
      <div className="flex gap-6">
        <a href="#" className="text-slate-500 hover:text-blue-500 transition-colors">
          <Globe className="w-5 h-5" />
        </a>
        <a href="#" className="text-slate-500 hover:text-blue-500 transition-colors">
          <Mail className="w-5 h-5" />
        </a>
        <a href="#" className="text-slate-500 hover:text-blue-500 transition-colors">
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};
