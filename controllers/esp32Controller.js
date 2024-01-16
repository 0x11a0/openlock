const WebSocket = require('ws');

exports.unlock = async (req, res) => {

    let esp32WebSocketClient = null;

    if (esp32WebSocketClient && esp32WebSocketClient.readyState === WebSocket.OPEN) {
        return res.status(400).json({ error: 'WebSocket connection is already open.' });
    }

    // Open the WebSocket connection
    esp32WebSocketClient = new WebSocket(process.env.WEBSOCKET_URL);

    // Wait for the WebSocket connection to open
    esp32WebSocketClient.on('open', () => {
        const jsonString = JSON.stringify(req.body);

        esp32WebSocketClient.send(jsonString)
    });

    // Handle WebSocket connection errors
    esp32WebSocketClient.on('error', (error) => {
        console.error('WebSocket error:', error);
        res.status(500).json({ error: 'WebSocket connection error.' });
        return;
    });

    res.json({ message: 'WebSocket connection opened and closed.' });

};