const crypto = require('crypto');

/**
 * Encrypt data using a given public key
 * @param {string} data - The data to encrypt
 * @param {string} publicKey - The public key for encryption
 * @returns {string} - The encrypted data in base64 format
 */
exports.encrypt = (data, publicKey) => {
  const buffer = Buffer.from(data, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

/**
 * Decrypt data using a given private key
 * @param {string} encryptedData - The encrypted data in base64 format
 * @param {string} privateKey - The private key for decryption
 * @returns {string} - The decrypted data
 */
exports.decrypt = (encryptedData, privateKey) => {
  const buffer = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

/**
 * Generate RSA key pair
 * @param {number} [keySize=2048] - The size of the RSA key, default is 2048 bits
 * @returns {Promise<{publicKey: string, privateKey: string}>} - The generated key pair
 */
exports.generateKeyPair = (keySize = 2048) => {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: keySize,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      } else {
        resolve({ publicKey, privateKey });
      }
    });
  });
};
