// websocketServer.js
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", function connection(ws) {
  console.log("WebSocket client connected");

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
});

module.exports = wss;
