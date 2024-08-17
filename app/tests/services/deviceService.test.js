const { expect } = require('chai');
const redis = require('redis');
const deviceService = require('../../services/deviceService');

describe('Device Service', () => {
  let client;

  before(() => {
    client = redis.createClient();
  });

  after(() => {
    client.quit();
  });

  describe('registerDevice', () => {
    it('should register a device with a given doorId and publicKey', async () => {
      const doorId = 'test-door-id';
      const publicKey = 'test-public-key';

      const reply = await deviceService.registerDevice(doorId, publicKey);
      expect(reply).to.equal('OK');

      // Verify the key is set in Redis
      client.get(doorId, (err, result) => {
        expect(result).to.equal(publicKey);
      });
    });

    it('should throw an error if Redis set operation fails', async () => {
      // Simulate Redis error
      const originalSet = client.set;
      client.set = (key, value, callback) => callback(new Error('Redis set error'));

      try {
        await deviceService.registerDevice('test-door-id', 'test-public-key');
      } catch (error) {
        expect(error.message).to.equal('Redis set error');
      }

      // Restore the original function
      client.set = originalSet;
    });
  });

  describe('getPublicKey', () => {
    it('should retrieve the publicKey for a given doorId', async () => {
      const doorId = 'test-door-id';
      const publicKey = 'test-public-key';

      await deviceService.registerDevice(doorId, publicKey);
      const result = await deviceService.getPublicKey(doorId);
      expect(result).to.equal(publicKey);
    });

    it('should return null if the publicKey is not found', async () => {
      const result = await deviceService.getPublicKey('nonexistent-door-id');
      expect(result).to.be.null;
    });

    it('should throw an error if Redis get operation fails', async () => {
      // Simulate Redis error
      const originalGet = client.get;
      client.get = (key, callback) => callback(new Error('Redis get error'));

      try {
        await deviceService.getPublicKey('test-door-id');
      } catch (error) {
        expect(error.message).to.equal('Redis get error');
      }

      // Restore the original function
      client.get = originalGet;
    });
  });
});
