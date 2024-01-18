const wss = require("./../websocketServer"); // Adjust the path based on your project structure
const WebSocket = require("ws");

exports.unlock = (req, res) => {
  try {
    const jsonString = JSON.stringify(req.body);

    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log("unlock message from server");
        console.log(jsonString);

        client.send("unlock message from server");
        client.send(jsonString);
      }
    });

    res.json({ message: "Message broadcasted to all clients." });
  } catch (error) {
    console.error("Broadcast error:", error);
    res.status(500).json({ error: "Failed to broadcast message." });
  }
};
