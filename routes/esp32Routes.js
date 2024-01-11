const express = require('express');
const esp32Controller = require('../controllers/esp32Controller');

const router = express.Router();

router.post('/unlock', esp32Controller.unlock)

// Export the router to be used in the main app.js or server.js file
module.exports = router;
