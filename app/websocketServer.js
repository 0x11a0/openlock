// websocketServer.js
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({ noServer: true });

const messageRateLimit = 5; // Max number of messages per interval
const rateLimitInterval = 10000; // Interval in ms (10 seconds in this case)
const userMessageCount = new Map();

wss.on("connection", function connection(ws, req) {
  const clientIp = req.socket.remoteAddress;
  userMessageCount.set(ws, 0);

  console.log(`WebSocket client connected: ${clientIp}`);
  console.log(`Total connected clients: ${wss.clients.size}`);

  console.log("WebSocket client connected");

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", (code, reason) => {
    userMessageCount.delete(ws);

    console.log(
      `WebSocket client ${clientIp} disconnected with code ${code} and reason ${reason}`
    );

    console.log(`Total connected clients: ${wss.clients.size}`);
  });

  ws.on("message", (message) => {
    let messageCount = userMessageCount.get(ws) || 0;
    messageCount++;

    if (messageCount > messageRateLimit) {
      console.warn(
        `Client ${clientIp} exceeded message rate limit. Disconnecting.`
      );
      ws.terminate();
      return;
    }

    userMessageCount.set(ws, messageCount);

    try {
      console.log(message.toString());
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log("Received message:", message.toString());
    ws.send("Message received");

    // Reset message count after the interval
    setTimeout(() => {
      userMessageCount.set(ws, 0);
    }, rateLimitInterval);
  });

  ws.send("Welcome to the WebSocket server!");
});

module.exports = wss;
