const { registerDevice, getPublicKey } = require('../services/deviceService');

exports.registerDevice = async (req, res) => {
  const { doorId, publicKey } = req.body;

  try {
    await registerDevice(doorId, publicKey);
    res.send('Device registered successfully.');
  } catch (error) {
    res.status(500).send('Failed to register device.');
  }
};

exports.getPublicKey = async (req, res) => {
  const { doorId } = req.query;

  try {
    const publicKey = await getPublicKey(doorId);
    if (!publicKey) return res.status(404).send('Public key not found.');
    res.send({ publicKey });
  } catch (error) {
    res.status(500).send('Failed to retrieve public key.');
  }
};
