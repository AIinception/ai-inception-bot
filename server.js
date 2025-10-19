import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const faq = JSON.parse(fs.readFileSync("faq.json", "utf8"));

// einfache Antwortfunktion
app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message || "";
  const relevant = faq.find(f => userMessage.toLowerCase().includes(f.question.toLowerCase()));

  let answer = relevant
    ? relevant.answer
    : "Das weiß ich leider nicht genau. Möchten Sie, dass ich Ihre Frage an den Support weiterleite?";

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Du bist ein hilfreicher Kundenservice-Chatbot, der höflich und präzise antwortet." },
      { role: "user", content: `Kunde fragt: ${userMessage}. FAQ-Antwort: ${answer}` }
    ]
  });

  res.json({ reply: completion.choices[0].message.content });
});

// health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server läuft auf Port ${PORT}`));
