const { forwardCommand, getStatus } = require('../services/commandService');

exports.sendCommand = async (req, res) => {
  const { doorId, encryptedCommand } = req.body;

  try {
    const status = await forwardCommand(doorId, encryptedCommand);
    res.send({ status });
  } catch (error) {
    res.status(500).send('Failed to send command.');
  }
};

exports.getStatus = async (req, res) => {
  const { doorId } = req.query;

  try {
    const status = await getStatus(doorId);
    res.send({ status });
  } catch (error) {
    res.status(500).send('Failed to get status.');
  }
};
