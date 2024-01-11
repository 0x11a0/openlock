const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// the server is a client to the esp32
let esp32WebSocketClient = null;

const isLogin = () => {
    return true
}

const handleApiRequest = (req, res) => {

    if (esp32WebSocketClient && esp32WebSocketClient.readyState === WebSocket.OPEN) {
        return res.status(400).json({ error: 'WebSocket connection is already open.' });
    }

    if (!isLogin) {
        res.status(401).json({ error: 'Authentication failed.' });
    }

    // Open the WebSocket connection
    esp32WebSocketClient = new WebSocket('ws://localhost:8080');

    // Wait for the WebSocket connection to open
    esp32WebSocketClient.on('open', () => {
        console.log('WebSocket connection opened.');

        // Send a message over the WebSocket
        // esp32WebSocketClient.send('Hello, WebSocket Server!');

        // Create a JSON object
        const data = {
            esp32: 12,
            instruction: 'open'
        };

        // Convert the JSON object to a string
        const jsonString = JSON.stringify(data);

        esp32WebSocketClient.send(jsonString)
    });

    // Optional: Wait for a response from the WebSocket server
    esp32WebSocketClient.on('message', (message) => {
        console.log(`Received message from WebSocket server: ${message}`);
        esp32WebSocketClient.close();
    });


    // Handle WebSocket connection errors
    esp32WebSocketClient.on('error', (error) => {
        console.error('WebSocket error:', error);
        res.status(500).json({ error: 'WebSocket connection error.' });
    });

    res.json({ message: 'WebSocket connection opened and closed.' });
}

app.post('/api/unlock', handleApiRequest);


server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});