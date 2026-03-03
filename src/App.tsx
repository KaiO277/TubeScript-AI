import React, { useState } from 'react';
import { 
  Zap, 
  Link as LinkIcon, 
  ArrowRight, 
  Copy, 
  Download, 
  Sparkles, 
  FileText, 
  Globe, 
  History, 
  PlayCircle,
  Video,
  ExternalLink,
  Mail
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [url, setUrl] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header */}
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

      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-5xl px-6 py-16 md:py-24 flex flex-col items-center text-center gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider"
          >
            <Zap className="w-3 h-3 fill-current" />
            AI-Powered Transcription
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-4xl md:text-7xl font-black leading-[1.1] tracking-tight max-w-4xl"
          >
            Transcribe YouTube <br className="hidden md:block" /> Videos <span className="text-blue-500">Instantly</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Get accurate, searchable transcripts and AI-powered summaries for any YouTube video in seconds. Just paste the link and let our AI do the rest.
          </motion.p>

          {/* URL Input Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl mt-4"
          >
            <div className="relative flex items-center p-2 rounded-2xl bg-white/5 border border-white/10 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all group shadow-2xl">
              <div className="pl-4 pr-2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <LinkIcon className="w-5 h-5" />
              </div>
              <input 
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-600 py-4 text-base md:text-lg"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                <span>Get Transcript</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Results Section */}
        <section className="w-full max-w-5xl px-6 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/[0.02] rounded-3xl border border-white/5 overflow-hidden shadow-2xl"
          >
            {/* Results Header */}
            <div className="px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-xl">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Video Transcript</h3>
                  <p className="text-xs text-slate-500">Paste a link to generate content</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium">
                  <Download className="w-4 h-4" />
                  TXT
                </button>
                <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all text-sm font-bold shadow-lg shadow-blue-600/20">
                  <Sparkles className="w-4 h-4" />
                  AI Summary
                </button>
              </div>
            </div>

            {/* Empty State Content Area */}
            <div className="p-16 md:p-28 flex flex-col items-center justify-center text-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 rounded-full"></div>
                <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center text-white/20">
                  <PlayCircle className="w-12 h-12" />
                </div>
              </div>
              
              <div className="max-w-sm">
                <h4 className="text-xl font-bold text-white mb-3">No transcript generated yet</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Enter a YouTube video URL above to see the transcription and AI analysis. You can then download or summarize the content.
                </p>
              </div>
              
              <button className="mt-2 px-8 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest">
                Try a Demo Video
              </button>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <FeatureCard 
              icon={<Zap className="w-5 h-5 text-blue-500" />}
              title="Blazing Fast"
              description="Transcribe hours of video in just a few minutes with our high-performance engine."
            />
            <FeatureCard 
              icon={<Globe className="w-5 h-5 text-blue-500" />}
              title="Multi-language"
              description="Support for over 50+ languages with automatic language detection and translation."
            />
            <FeatureCard 
              icon={<History className="w-5 h-5 text-blue-500" />}
              title="Smart Summaries"
              description="Get the core insights instantly without watching the entire video through AI synthesis."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h5 className="font-bold text-white mb-3 text-lg">{title}</h5>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}
