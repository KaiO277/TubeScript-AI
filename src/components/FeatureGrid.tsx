import React from 'react';
import { motion } from 'motion/react';
import { Zap, Globe, History } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl px-6 pb-24 mx-auto">
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
  );
};

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
