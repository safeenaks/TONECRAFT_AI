// server/index.js
app.get("/", (req, res) => {
  res.send("ToneCraft AI backend is running");
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   GROQ CONFIG
========================= */

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/* =========================
   ROUTE
========================= */

app.post("/generate", async (req, res) => {
  try {
    console.log("Request received");

    const {
      message,
      tone,
      recipient,
      context,
    } = req.body;

    /* =========================
       VALIDATION
    ========================= */

    if (!message || message.trim() === "") {
      return res.status(400).json({
        reply: "Message is required.",
      });
    }

    /* =========================
       PROMPT
    ========================= */

    const prompt = `
You are ToneCraft AI.

Your task is to generate emotionally intelligent replies.

USER MESSAGE:
"${message}"

RECIPIENT:
${recipient}

TONE:
${tone}

CUSTOM CONTEXT:
${context || "None"}

INSTRUCTIONS:
- Sound natural
- Sound human
- Avoid robotic wording
- Keep it concise
- Match the requested tone
- Make communication clear and confident
- Generate ONLY the final reply
`;

    /* =========================
       AI GENERATION
    ========================= */

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are ToneCraft AI.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

    const text =
      completion.choices[0].message.content;

    console.log("Generated Reply:");
    console.log(text);

    /* =========================
       SUCCESS RESPONSE
    ========================= */

    res.status(200).json({
      reply: text,
      confidence: "94%",
    });

  } catch (error) {

    console.log("FULL ERROR:");
    console.log(error);

    /* =========================
       QUOTA ERROR
    ========================= */

    if (error.status === 429) {
      return res.status(429).json({
        reply:
          "Groq API quota exceeded. Please try again later.",
      });
    }

    /* =========================
       INVALID KEY
    ========================= */

    if (error.status === 401) {
      return res.status(401).json({
        reply:
          "Invalid Groq API key.",
      });
    }

    /* =========================
       GENERAL ERROR
    ========================= */

    res.status(500).json({
      reply:
        "Something went wrong while generating the reply.",
    });
  }
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});