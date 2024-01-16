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
const userController = require('../controllers/userController'); // Import our user controller
const sessionController = require('../controllers/sessionController'); // Import our user controller
const auth = require('../middleware/auth'); // Import our authentication middleware

const router = express.Router(); // Create a new Express router

// 1. Route for registering a new user
// POST /users/register
// This route doesn't require any middleware as anyone should be able to register
router.post('/register', userController.register);

// 2. Route for logging in an existing user
// POST /users/login
// Like register, login also doesn't require any middleware
router.post('/login', userController.login);

// 3. Route for getting the authenticated user's profile
// GET /users/me
// The 'auth.isAuthenticated' middleware ensures that only authenticated users can access their profile
router.get('/me', auth.isAuthenticated, userController.getProfile);

// 4. Route for logging out the user from the current device
// POST /users/logout
// The 'auth.isAuthenticated' middleware ensures that only authenticated users can log out
router.post('/logout', auth.isAuthenticated, userController.logout);

router.get('/sessions', auth.isAuthenticated, sessionController.getSessions);
router.post('/sessions/register', auth.isAuthenticated, sessionController.register);

// Export the router to be used in the main app.js or server.js file
module.exports = router;
