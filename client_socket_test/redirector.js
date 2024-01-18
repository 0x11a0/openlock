const WebSocket = require("websocket");

let wsClient = new WebSocket.client();
wsClient.on("open", function open() {
  console.log("Connected to the server");
  ws.send("Hello server!");
});

wsClient.on("connectFailed", (error) => {
  console.log(`WebSocket connection failed: ${error.toString()}`);
});

wsClient.on("ping", function heartbeat() {
  console.log("Received ping, sending pong");
  ws.pong();
});

wsClient.on("connect", (connection) => {
  console.log("WebSocket client connected");

  connection.on("error", (error) => {
    console.log(`Connection Error: ${error.toString()}`);
  });

  connection.on("close", () => {
    console.log("WebSocket client disconnected");
  });

  connection.on("message", (message) => {
    if (message.type === "utf8") {
      console.log(`Received from ESP32: ${message.utf8Data}`);
    }
  });
});

wsClient.connect("ws://192.168.1.111:3000");
// wsClient.connect("ws://192.168.131.202:8080");
console.log("connecting");
