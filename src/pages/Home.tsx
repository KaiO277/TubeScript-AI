import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { TranscriptResult } from '../components/TranscriptResult';
import { FeatureGrid } from '../components/FeatureGrid';

export const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [fullResult, setFullResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'transcript' | 'json'>('json');

  const exampleData = {
    "success": true,
    "message": "Video processed successfully",
    "video_id": "8eTKKIf-GKU",
    "result": {
      "video_id": "8eTKKIf-GKU",
      "video_url": "https://www.youtube.com/watch?v=8eTKKIf-GKU",
      "title": "The Origin of Capital",
      "transcript": " 안녕하십니까, 청취 여러분들. 고독한 낭독입니다. 오늘 낭독해서는요. 최사장 작가에 지적별을 위한 넓고 같은 짓이 1건을 준비하였습니다. 역사. 우리가 살아가는 이 순간조차 결국은 과거가 되요. 긴 흐름 속에 스며드는 이야기 한 장이 됩니다. 이 책은 방대한 인류의 지식을 지적 대화를 위한 첫거름으로 풀어낸 안내서인데요. 그중에서도 역사는 우리가 지금 여기에 존재하는 이유를 가장 명확하게 보여주는 거에대죠. 역사는 단지 과거의 연대기나 사실 나열하는 것이 아니라 어떤 가치가 집에 있고 어떤 믿음이 색을 움직여 쓰며 인간은 무엇을 위해 싸우고 나아가는 가을 묻고 또 다 폐 나가는 과정이죠. 이 책은 역사를 단순한 사건의 흐름으로 보지 않습니다. 이념의 중심으로 시대를 구분하고 인간의 선택과 갈등을 명쾌하게 풀어내죠. 신의 중심이었던 시대에서 인간이 중심이 되는 시대로 왕이집에 했던 세계에서 시민이 걸리를 외치는 사회로 그리고 자본이 세상 룰을 정해가는 오늘 날까지. 그 변화 속에 인...",
      "transcript_length": 39734,
      "dataset": {
        "title": "The Origin of Capital",
        "genre": [
          "History",
          "Economics"
        ],
        "core_theme": "The rise of capitalism",
        "setting": "Pre-industrial societies",
        "time_period": "Pre-industrial to early industrial",
        "tone": [
          "Serious",
          "Analytical"
        ],
        "characters": [
          {
            "name": "A",
            "role": "A member of a pre-industrial society",
            "goal": "To understand the nature of production",
            "description": "A curious individual who observes the way goods are produced and consumed."
          },
          {
            "name": "B",
            "role": "A member of a pre-industrial society",
            "goal": "To contribute to the community",
            "description": "A hardworking individual who helps to produce and distribute goods."
          }
        ],
        "central_conflict": "The conflict between individual property rights and collective ownership",
        "story_structure": {
          "setup": "The origin of production in pre-industrial societies",
          "inciting_incident": "The discovery of agriculture and the domestication of animals",
          "rising_conflicts": [
            "The emergence of social hierarchies",
            "The development of trade and commerce"
          ],
          "midpoint": "The rise of private property and the concentration of wealth",
          "climax": "The conflict between the state and the emerging bourgeoisie",
          "resolution": "The establishment of capitalism as a dominant economic system"
        },
        "plot_twist": "The role of the state in the emergence of capitalism",
        "emotional_arc": [
          "Curiosity",
          "Concern",
          "Understanding"
        ],
        "chapters": 6,
        "approx_words": 20000
      },
      "story_file": null,
      "created_at": "2026-03-06T14:50:59.130929",
      "status": "completed",
      "files": {
        "audio": "downloads\\8eTKKIf-GKU\\audio.mp3",
        "transcript": "downloads\\8eTKKIf-GKU\\transcript.txt",
        "dataset": "downloads\\8eTKKIf-GKU\\story_dataset.json"
      }
    },
    "error": null
  };

  const loadExample = () => {
    setTranscript(exampleData.result.transcript);
    setFullResult(exampleData);
    setUrl(exampleData.result.video_url);
  };
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
    setFullResult(null);

    try {
      // 2. Gọi thẳng đến Server Express (Port 3000)
      const response = await fetch('/transcript', { 
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
      if (data.success) {
        setTranscript(data.result.transcript);
        setFullResult(data);
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
    const content = viewMode === 'transcript' ? transcript : JSON.stringify(fullResult, null, 2);
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const content = viewMode === 'transcript' ? transcript : JSON.stringify(fullResult, null, 2);
    if (content) {
      const element = document.createElement("a");
      const file = new Blob([content], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = viewMode === 'transcript' ? "transcript.txt" : "result.json";
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

      <div className="mb-8">
        <button 
          onClick={loadExample}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors border-b border-blue-400/30 pb-0.5"
        >
          Xem kết quả mẫu (JSON)
        </button>
      </div>

      <TranscriptResult 
        transcript={transcript} 
        fullResult={fullResult}
        loading={loading} 
        onCopy={handleCopy} 
        onDownload={handleDownload} 
        copied={copied} 
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <FeatureGrid />
    </main>
  );
};
