// Import required modules
const app = require("./app");
const http = require("http");
const wss = require("./websocketServer"); // Import WebSocket server
require("dotenv").config();

const server = http.createServer(app);

// Attach WebSocket server to the same HTTP server
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

// Start the Express server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
