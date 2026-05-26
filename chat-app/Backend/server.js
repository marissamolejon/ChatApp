const express = require("express");
const cors = require("cors");
const messagesRouter = require("./routes/messages");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/messages", messagesRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Chat backend running on http://localhost:${PORT}`);
});