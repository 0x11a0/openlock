const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;

// Create a WebSocket server with no server attachment initially
const wss = new WebSocketServer({ noServer: true });

const messageRateLimit = 5; // Maximum number of messages per interval
const rateLimitInterval = 10000; // Interval in ms (10 seconds)
const userMessageCount = new Map(); // Track message counts for each client

wss.on("connection", (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  userMessageCount.set(ws, 0);

  console.log(`WebSocket client connected: ${clientIp}`);
  console.log(`Total connected clients: ${wss.clients.size}`);

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", (code, reason) => {
    userMessageCount.delete(ws);
    console.log(`WebSocket client ${clientIp} disconnected with code ${code} and reason ${reason}`);
    console.log(`Total connected clients: ${wss.clients.size}`);
  });

  ws.on("message", (message) => {
    let messageCount = userMessageCount.get(ws) || 0;
    messageCount++;

    if (messageCount > messageRateLimit) {
      console.warn(`Client ${clientIp} exceeded message rate limit. Disconnecting.`);
      ws.terminate();
      return;
    }

    userMessageCount.set(ws, messageCount);

    try {
      const parsedMessage = JSON.parse(message);
      console.log("Received message:", parsedMessage);
      // Handle the received message here, depending on your application logic
    } catch (error) {
      console.error("Error parsing JSON:", error);
      ws.send(JSON.stringify({ error: "Invalid JSON format" }));
      return;
    }

    ws.send(JSON.stringify({ message: "Message received" }));

    // Reset message count after the interval
    setTimeout(() => {
      userMessageCount.set(ws, 0);
    }, rateLimitInterval);
  });

  ws.send(JSON.stringify({ message: "Welcome to the WebSocket server!" }));
});

module.exports = wss;
