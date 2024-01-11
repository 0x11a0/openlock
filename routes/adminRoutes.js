/**
 * expressRoute.js
 * 
 * This file defines the routing for our Express application, essentially mapping HTTP requests to specific functions (controllers).
 * Each route specifies:
 * 1. An HTTP method (GET, POST, etc.).
 * 2. A path or endpoint.
 * 3. A function (often from expressController.js) that should be executed when the endpoint is accessed with the specified method.
 * 
 * Key components include:
 * - Routes for user registration, login, profile access, and log out.
 * - Use of middleware (like `auth.js`) to protect certain routes and ensure they can only be accessed by authenticated users.
 * 
 * This helps in organizing our application in a RESTful manner, ensuring separation of concerns and maintainability.
 */


const express = require('express'); // Import Express
const adminController = require('../controllers/adminController'); // Import our user controller
const auth = require('../middleware/auth'); // Import our authentication middleware

const router = express.Router(); // Create a new Express router

// 1. Route for registering a new user
// POST /users/register
// This route doesn't require any middleware as anyone should be able to register
router.post('/register', auth.isAuthenticated, auth.isAdmin, adminController.createAdmin);

// 5. Route for logging out the user from all devices
// POST /users/logoutAll
// The 'auth.isAuthenticated' middleware ensures that only authenticated users can log out from all devices
router.post('/logoutAll', auth.isAuthenticated, auth.isAdmin, adminController.logoutAll);

// Export the router to be used in the main app.js or server.js file
module.exports = router;
