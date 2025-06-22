const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve HTML files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("📡 New WebSocket connection");

  ws.on("message", (message) => {
  const text = message.toString(); // 🔥 convert Buffer to string
  console.log("📩 Received:", text);

  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(text); // 👈 send plain string
      console.log("➡️ Sent to viewer:", text);
    }
  });
});
});
