const express = require("express");
const router = express.Router();
const { getMessages, addMessage } = require("../Data/store");

// GET /messages
router.get("/", (req, res) => {
  res.json(getMessages());
});

// POST /messages
router.post("/", (req, res) => {
  const { username, text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Message text is required" });
  }

  const message = addMessage({ username, text: text.trim() });
  res.status(201).json(message);
});

module.exports = router;