const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "PawCare backend is running",
  });
});

app.post("/api/ai/chat", async (req, res) => {
  try {
    console.log("AI request received");

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "OpenRouter API key is missing",
      });
    }

    console.log("Message:", message);
    console.log("Calling OpenRouter...");

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 20000);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "PawCare",
        },

       body: JSON.stringify({
  model: "openai/gpt-chat-latest",
  max_tokens: 500,
  messages: [
            {
              role: "system",
              content: `
You are PawCare AI, a helpful pet-care information assistant.

Your job is to help pet owners understand general information about their pet's symptoms.

Important rules:
- Give general educational information only.
- Do not diagnose medical conditions.
- Do not prescribe medication.
- Do not tell users to start, stop, or change medication.
- Recommend contacting a veterinarian when appropriate.
- If symptoms could indicate an emergency, clearly recommend immediate veterinary care.
- Keep responses concise, practical, reassuring, and easy to understand.
- Avoid unnecessary medical terminology.
              `,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),

        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    console.log("OpenRouter HTTP status:", response.status);

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenRouter API request failed",
      });
    }

    const reply =
      data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Empty OpenRouter response:", data);

      return res.status(500).json({
        error: "OpenRouter returned an empty response",
      });
    }

    console.log("OpenRouter responded!");

    res.json({
      reply,
    });
  } catch (error) {
    console.error("OPENROUTER ERROR:", error);

    if (error.name === "AbortError") {
      return res.status(504).json({
        error:
          "AI took too long to respond. Please try again.",
      });
    }

    res.status(500).json({
      error:
        error.message ||
        "Failed to get response from OpenRouter",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `PawCare AI server running on http://localhost:${PORT}`
  );
});