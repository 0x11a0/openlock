const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/register', sessionController.register);
router.get('/', sessionController.getSessions);

module.exports = router;
