// deviceService.js
const redis = require('redis');
const client = redis.createClient();

exports.registerDevice = async (doorId, publicKey) => {
  return new Promise((resolve, reject) => {
    client.set(doorId, publicKey, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
};

exports.getPublicKey = async (doorId) => {
  return new Promise((resolve, reject) => {
    client.get(doorId, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
};
