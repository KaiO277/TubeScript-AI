import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

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
  if (!url) {
    setError('Please enter a valid YouTube URL');
    return;
  }

  setError(null);
  setLoading(true);
  setTranscript(null);

  try {
    const response = await fetch('/transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }), // ✅ GỬI URL thay vì videoId
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(errText);
      throw new Error('Failed to fetch transcript');
    }

    const data = await response.json();
    console.log(data);
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
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0a0f18] text-slate-200 font-sans selection:bg-blue-500/30">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
