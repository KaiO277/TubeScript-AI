import React from 'react';
import { motion } from 'motion/react';
import { Zap, Link as LinkIcon, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface HeroProps {
  url: string;
  setUrl: (url: string) => void;
  onGetTranscript: () => void;
  loading: boolean;
  error: string | null;
}

export const Hero: React.FC<HeroProps> = ({ url, setUrl, onGetTranscript, loading, error }) => {
  return (
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

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl mt-4"
      >
        <div className={`relative flex items-center p-2 rounded-2xl bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all group shadow-2xl`}>
          <div className={`pl-4 pr-2 ${error ? 'text-red-500' : 'text-slate-500 group-focus-within:text-blue-500'} transition-colors`}>
            <LinkIcon className="w-5 h-5" />
          </div>
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onGetTranscript()}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-600 py-4 text-base md:text-lg"
          />
          <button 
            onClick={onGetTranscript}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Get Transcript</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-3 flex items-center justify-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
