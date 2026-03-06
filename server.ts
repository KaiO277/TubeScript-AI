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
  app.post("/transcript", async (req, res) => {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "YouTube URL is required" });
    }

    console.log(`Received request for URL: ${url}`);

    try {
      const externalResponse = await fetch("http://127.0.0.1:8000/api/process-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer dummy_token"
        },
        body: JSON.stringify({
          url: url,
          model_size: "base",
          max_words: 2000,
          generate_story: false,
          story_total_words: 20000,
          story_chapters: 20
        }),
      });

      if (!externalResponse.ok) {
        const errorText = await externalResponse.text();
        console.error("FastAPI error:", errorText);
        return res.status(externalResponse.status).json({
          error: "FastAPI error",
          details: errorText,
        });
      }

      const data = await externalResponse.json();
      res.json(data);

    } catch (error) {
      console.error("Error calling FastAPI:", error);
      res.status(500).json({
        error: "Failed to fetch transcript",
        details: error instanceof Error ? error.message : String(error),
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
