// commandService.js
const WebSocket = require('ws');
const { websocketPort } = require('../config');

const wss = new WebSocket.Server({ port: websocketPort });
const connections = new Map();

wss.on('connection', (ws, req) => {
  ws.on('message', message => {
    const { doorId, sessionToken } = JSON.parse(message);
    connections.set(doorId, { ws, sessionToken });
  });
});

exports.forwardCommand = async (doorId, encryptedCommand) => {
  const connection = connections.get(doorId);
  if (!connection) throw new Error('Device not connected.');

  connection.ws.send(JSON.stringify({ encryptedCommand }));
  return new Promise((resolve) => {
    connection.ws.on('message', (message) => {
      const response = JSON.parse(message);
      resolve(response.status);
    });
  });
};

exports.getStatus = async (doorId) => {
  const connection = connections.get(doorId);
  if (!connection) throw new Error('Device not connected.');

  connection.ws.send(JSON.stringify({ command: 'getStatus' }));
  return new Promise((resolve) => {
    connection.ws.on('message', (message) => {
      const response = JSON.parse(message);
      resolve(response.status);
    });
  });
};
