import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please verify your workspace contains a valid GEMINI_API_KEY secret.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// NLP Summariser Endpoint
app.post("/api/summarize", async (req, res) => {
  try {
    const { text, length = "medium", tone = "professional", customInstruction = "" } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      res.status(400).json({ error: "Input text is required for summarization." });
      return;
    }

    const ai = getGeminiClient();

    let lengthInstruction = "";
    if (length === "short") {
      lengthInstruction = "Write a concise summary in 1 or 2 elegant, high-impact sentences.";
    } else if (length === "detailed") {
      lengthInstruction = "Write a comprehensive executive summary organized in clean structure with logical key bulletins.";
    } else {
      lengthInstruction = "Write a robust, well-rounded informative paragraph summarizing the core theses.";
    }

    const systemInstruction = 
      `You are Mohammad Jaffer Sameer's proprietary NLP Summarization Engine. ` +
      `Your purpose is to produce high-density, accurate, and completely objective summaries of documents. ` +
      `Adhere strictly to the requested constraints: target length, specified tone, and custom instructions. ` +
      `Provide the summary directly in clean Markdown format with elegant spacing. No conversational preambles or postscripts inside the response.`;

    const userPrompt = 
      `Please summarize the following document.
      
[TARGET SCALING]:
- Tone: ${tone}
- Length Constraint: ${lengthInstruction}
${customInstruction ? `- Specialized Directives: ${customInstruction}` : ""}

[DOCUMENT SOURCE CONTENT]:
${text}

[SUMMARY]:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    const summaryText = response.text || "No summary could be generated.";
    res.json({ summary: summaryText });

  } catch (error: any) {
    console.error("Error during summarization request:", error);
    res.status(500).json({ 
      error: error.message || "An unexpected error occurred in the summarization engine." 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", keyAvailable: !!process.env.GEMINI_API_KEY });
});

// Vite middleware setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to initialize server with Vite integration:", err);
  process.exit(1);
});
