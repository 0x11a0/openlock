const { expect } = require('chai');
const WebSocket = require('ws');
const commandService = require('../../services/commandService');
const { websocketPort } = require('../../config');

describe('Command Service', () => {
  let server;
  let client;

  before((done) => {
    // Start WebSocket server
    server = new WebSocket.Server({ port: websocketPort });
    server.on('connection', (ws) => {
      ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.encryptedCommand) {
          ws.send(JSON.stringify({ status: 'Command received' }));
        } else if (parsedMessage.command === 'getStatus') {
          ws.send(JSON.stringify({ status: 'Device is online' }));
        }
      });
    });

    // Set up WebSocket client
    client = new WebSocket(`ws://localhost:${websocketPort}`);
    client.on('open', () => {
      client.send(JSON.stringify({ doorId: 'test-door-id', sessionToken: 'test-session-token' }));
      done();
    });
  });

  after(() => {
    server.close();
    client.close();
  });

  describe('forwardCommand', () => {
    it('should forward command to the device and receive status', async () => {
      // Mock the connection
      commandService.connections.set('test-door-id', { ws: client, sessionToken: 'test-session-token' });

      const status = await commandService.forwardCommand('test-door-id', 'test-encrypted-command');
      expect(status).to.equal('Command received');
    });

    it('should throw an error if device is not connected', async () => {
      try {
        await commandService.forwardCommand('nonexistent-door-id', 'test-encrypted-command');
      } catch (error) {
        expect(error.message).to.equal('Device not connected.');
      }
    });
  });

  describe('getStatus', () => {
    it('should request and receive the status of the device', async () => {
      // Mock the connection
      commandService.connections.set('test-door-id', { ws: client, sessionToken: 'test-session-token' });

      const status = await commandService.getStatus('test-door-id');
      expect(status).to.equal('Device is online');
    });

    it('should throw an error if device is not connected', async () => {
      try {
        await commandService.getStatus('nonexistent-door-id');
      } catch (error) {
        expect(error.message).to.equal('Device not connected.');
      }
    });
  });
});
