const WebSocket = require('ws');
require('dotenv').config();

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {

        try {
            // Parse the received message into a JSON object
            const data = JSON.parse(message);

            // Check if the received data is a valid JSON object
            if (typeof data === 'object') {
                // You can now access the JSON data as an object
                console.log('Received JSON data:');
                console.log(data);

                if (isCorrectESP32(data.esp32Code) && data.instruction === 'open') {
                    // Implement code to handle 'open' instruction
                    console.log('Opening...');
                    ws.send('opened');
                }
            } else {
                console.log('Received message is not a valid JSON object:', message);
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});


const isCorrectESP32 = (inputESP32Code) => {
    const currentESP32 = process.env.ESP32_CODE

    if (currentESP32 === inputESP32Code) {
        return true
    }
    return false
}