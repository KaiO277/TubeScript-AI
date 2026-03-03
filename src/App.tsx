import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TranscriptResult } from './components/TranscriptResult';
import { FeatureGrid } from './components/FeatureGrid';
import { Footer } from './components/Footer';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleGetTranscript = async () => {
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setError(null);
    setLoading(true);
    setTranscript(null);

    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transcript');
      }

      const data = await response.json();
      setTranscript(data.transcript);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (transcript) {
      const element = document.createElement("a");
      const file = new Blob([transcript], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "transcript.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans selection:bg-blue-500/30">
      <Header />

      <main className="flex flex-col items-center">
        <Hero 
          url={url} 
          setUrl={setUrl} 
          onGetTranscript={handleGetTranscript} 
          loading={loading} 
          error={error} 
        />

        <TranscriptResult 
          transcript={transcript} 
          loading={loading} 
          onCopy={handleCopy} 
          onDownload={handleDownload} 
          copied={copied} 
        />

        <FeatureGrid />
      </main>

      <Footer />
    </div>
  );
}
