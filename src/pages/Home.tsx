import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { TranscriptResult } from '../components/TranscriptResult';
import { FeatureGrid } from '../components/FeatureGrid';

export const Home: React.FC = () => {
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
    // 1. Kiểm tra URL rỗng
    if (!url.trim()) {
      setError('Vui lòng nhập URL YouTube');
      return;
    }

    setError(null);
    setLoading(true);
    setTranscript(null);

    try {
      // 2. Gọi thẳng đến Server Express (Port 3000)
      // Lưu ý: Nếu đã cấu hình proxy trong vite.config.ts thì để nguyên '/transcript'
      const response = await fetch('http://localhost:3000/transcript', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 3. GỬI KEY "url" - Đúng như Backend FastAPI yêu cầu
        body: JSON.stringify({ url: url }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch transcript');
      }

      const data = await response.json();

      // 4. Kiểm tra logic success/error từ API trả về
      if (data.status === "success") {
        setTranscript(data.transcript);
      } else {
        setError(data.message || "Không tìm thấy transcript cho video này.");
      }

    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
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
  );
};
