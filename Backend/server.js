const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const messages = [];

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { username, text } = req.body;
  if (!text) return res.status(400).json({ error: "text required" });
  const msg = { id: Date.now(), username: username || "Anonymous", text, timestamp: new Date().toISOString() };
  messages.push(msg);
  res.status(201).json(msg);
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));