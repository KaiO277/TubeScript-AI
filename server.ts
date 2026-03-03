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
      console.log(`Calling external API: http://127.0.0.1:8000/transcript for videoId: ${videoId}`);
      
      const externalResponse = await fetch("http://127.0.0.1:8000/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });

      if (!externalResponse.ok) {
        const errorText = await externalResponse.text();
        console.error(`External API error: ${externalResponse.status} - ${errorText}`);
        throw new Error(`External API returned ${externalResponse.status}`);
      }

      const data = await externalResponse.json();
      
      // Assuming the external API returns { transcript: "..." }
      res.json({ 
        transcript: data.transcript || "No transcript returned from API",
        videoId: videoId,
        status: "success"
      });
    } catch (error) {
      console.error("Error calling external API:", error);
      res.status(500).json({ 
        error: "Failed to fetch transcript from external API",
        details: error instanceof Error ? error.message : String(error)
      });
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
