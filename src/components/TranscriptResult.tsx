import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Copy, Download, Sparkles, CheckCircle2, PlayCircle, Loader2 } from 'lucide-react';

interface TranscriptResultProps {
  transcript: string | null;
  loading: boolean;
  onCopy: () => void;
  onDownload: () => void;
  copied: boolean;
}

export const TranscriptResult: React.FC<TranscriptResultProps> = ({ 
  transcript, 
  loading, 
  onCopy, 
  onDownload, 
  copied 
}) => {
  return (
    <section className="w-full max-w-5xl px-6 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/[0.02] rounded-3xl border border-white/5 overflow-hidden shadow-2xl"
      >
        <div className="px-6 py-5 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-white">Video Transcript</h3>
              <p className="text-xs text-slate-500">
                {transcript ? 'Transcription complete' : 'Paste a link to generate content'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onCopy}
              disabled={!transcript}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button 
              onClick={onDownload}
              disabled={!transcript}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              TXT
            </button>
            <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>
            <button 
              disabled={!transcript}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold shadow-lg shadow-blue-600/20"
            >
              <Sparkles className="w-4 h-4" />
              AI Summary
            </button>
          </div>
        </div>

        <div className="min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-16 text-center gap-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-[60px] opacity-20 rounded-full animate-pulse"></div>
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin relative" />
                </div>
                <div className="max-w-xs">
                  <h4 className="text-lg font-bold text-white mb-2">Transcribing video...</h4>
                  <p className="text-slate-500 text-sm">Our AI is processing the audio. This usually takes a few seconds.</p>
                </div>
              </motion.div>
            ) : transcript ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 md:p-10"
              >
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                    {transcript}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 p-16 md:p-28 flex flex-col items-center justify-center text-center gap-8"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
