const { expect } = require('chai');
const crypto = require('crypto');
const encryptionUtils = require('../../utils/encryptionUtils');

describe('Encryption Utils', () => {
  let publicKey;
  let privateKey;

  before(async () => {
    // Generate a key pair for testing
    const keyPair = await encryptionUtils.generateKeyPair(1024); // Use smaller key size for faster tests
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
  });

  describe('encrypt', () => {
    it('should encrypt data with a given public key', () => {
      const data = 'test data';
      const encryptedData = encryptionUtils.encrypt(data, publicKey);

      expect(encryptedData).to.be.a('string');
      expect(encryptedData).to.not.equal(data);
    });

    it('should throw an error if data is not provided', () => {
      expect(() => encryptionUtils.encrypt(undefined, publicKey)).to.throw();
    });

    it('should throw an error if public key is not provided', () => {
      expect(() => encryptionUtils.encrypt('test data', undefined)).to.throw();
    });
  });

  describe('decrypt', () => {
    it('should decrypt data with a given private key', () => {
      const data = 'test data';
      const encryptedData = encryptionUtils.encrypt(data, publicKey);
      const decryptedData = encryptionUtils.decrypt(encryptedData, privateKey);

      expect(decryptedData).to.equal(data);
    });

    it('should throw an error if encrypted data is not provided', () => {
      expect(() => encryptionUtils.decrypt(undefined, privateKey)).to.throw();
    });

    it('should throw an error if private key is not provided', () => {
      expect(() => encryptionUtils.decrypt('test data', undefined)).to.throw();
    });
  });

  describe('generateKeyPair', () => {
    it('should generate a key pair', async () => {
      const keyPair = await encryptionUtils.generateKeyPair(1024);
      expect(keyPair).to.have.property('publicKey');
      expect(keyPair).to.have.property('privateKey');
    });

    it('should generate a key pair with a default key size of 2048', async () => {
      const keyPair = await encryptionUtils.generateKeyPair();
      const publicKeySize = crypto.createPublicKey(keyPair.publicKey).asymmetricKeySize;
      expect(publicKeySize).to.equal(256); // 2048 bits = 256 bytes
    });

    it('should throw an error if key generation fails', async () => {
      // Simulate key generation error
      const originalGenerateKeyPair = crypto.generateKeyPair;
      crypto.generateKeyPair = (type, options, callback) => callback(new Error('Key generation error'));

      try {
        await encryptionUtils.generateKeyPair();
      } catch (error) {
        expect(error.message).to.equal('Key generation error');
      }

      // Restore the original function
      crypto.generateKeyPair = originalGenerateKeyPair;
    });
  });
});
