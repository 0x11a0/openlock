const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.post('/register', sessionController.register);

module.exports = router;
