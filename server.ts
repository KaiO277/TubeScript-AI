import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for transcription
  // This is where the user can "attach" their real API logic
  app.post("/api/transcript", async (req, res) => {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    console.log(`Received request for video ID: ${videoId}`);

    try {
      // MOCK RESPONSE: In a real app, you would call an external API or use a library here
      // Example: const transcript = await someTranscriptionService(videoId);
      
      // Simulating a delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockTranscript = `This is a sample transcript for YouTube video ID: ${videoId}. 

In this video, we discuss how AI is changing the landscape of content creation. 
TubeScript allows users to quickly get text versions of their favorite videos.

Key points covered:
1. Introduction to AI Transcription.
2. How to use TubeScript.
3. Benefits of searchable video content.
4. Future updates and roadmap.

Thank you for watching!`;

      res.json({ 
        transcript: mockTranscript,
        videoId: videoId,
        status: "success"
      });
    } catch (error) {
      console.error("Error fetching transcript:", error);
      res.status(500).json({ error: "Failed to fetch transcript" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
