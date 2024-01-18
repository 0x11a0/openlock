/**
 * index.js
 *
 * This is the entry point of our Express application. It handles:
 * 1. Database connection setup using the Mongoose library.
 * 2. Starting the Express server once the database is successfully connected.
 * 3. Environment variables configuration using the `dotenv` library.
 *
 * This separation allows for cleaner application startup and makes it easier to manage the initialization process.
 */

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
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
