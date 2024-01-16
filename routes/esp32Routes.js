const express = require('express');
const esp32Controller = require('../controllers/esp32Controller');
const auth = require('../middleware/auth'); // Import our authentication middleware

const router = express.Router();

router.post('/unlock', auth.isAuthenticated, esp32Controller.unlock)

// Export the router to be used in the main app.js or server.js file
module.exports = router;
