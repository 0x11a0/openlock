// commandRoutes.js
const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send-command', authMiddleware, commandController.sendCommand);
router.get('/status', authMiddleware, commandController.getStatus);

module.exports = router;
