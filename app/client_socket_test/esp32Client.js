const WebSocket = require("ws");

// Replace with the appropriate WebSocket server URL
const wsUrl = "ws://47.129.6.100:3000/"; // or the port you are using for your WebSocket server
const ws = new WebSocket(wsUrl);

ws.on("open", function open() {
  console.log("Connected to the server");
  ws.send("Hello, server!");
});

ws.on("message", (message) => {
  console.log("Received:", message.toString());
});

ws.on("close", function close() {
  console.log("Disconnected from the server");
});

ws.on("error", function error(error) {
  console.error("WebSocket error:", error);
});
