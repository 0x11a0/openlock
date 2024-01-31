// websocketServer.js
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", function connection(ws) {
  console.log("WebSocket client connected");

  const interval = setInterval(() => {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(null, false, true);
  }, 45000);

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("message", (message) => {
    try {
      console.log(message.toString());
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log("Received message:", message.toString());
    ws.send("Message received");
  });

  ws.send("Welcome to the WebSocket server!");

  ws.on("close", () => {
    clearInterval(interval);
  });
});

module.exports = wss;
