const express = require('express'); // Import Express
const adminController = require('../controllers/adminController'); // Import our user controller
const auth = require('../middleware/auth'); // Import our authentication middleware

const router = express.Router(); // Create a new Express router

router.post('/register', auth.isAuthenticated, auth.isAdmin, adminController.createAdmin);

router.post('/logoutAll', auth.isAuthenticated, auth.isAdmin, adminController.logoutAll);

// Export the router to be used in the main app.js or server.js file
module.exports = router;
