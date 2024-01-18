const WebSocket = require("ws");

exports.unlock = async (req, res) => {
  let esp32WebSocketClient = null;

  if (
    esp32WebSocketClient &&
    esp32WebSocketClient.readyState === WebSocket.OPEN
  ) {
    return res
      .status(400)
      .json({ error: "WebSocket connection is already open." });
  }

  try {
    // Open the WebSocket connection and wait for it to open
    esp32WebSocketClient = new WebSocket(process.env.WEBSOCKET_URL);
    await new Promise((resolve, reject) => {
      esp32WebSocketClient.on("open", () => {
        const jsonString = JSON.stringify(req.body);
        esp32WebSocketClient.send(jsonString);
        resolve();
      });

      esp32WebSocketClient.on("error", (error) => {
        console.error("WebSocket error:", error);
        reject(new Error("WebSocket connection error."));
      });
    });

    res.json({ message: "WebSocket connection opened and message sent." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    // Close the WebSocket connection if it's open
    if (
      esp32WebSocketClient &&
      esp32WebSocketClient.readyState === WebSocket.OPEN
    ) {
      esp32WebSocketClient.close();
    }
  }
};
