/**
 * expressController.js
 * 
 * This file contains the application logic associated with each route defined in expressRoutes.js.
 * Instead of placing our logic directly within the routes, we modularize them into controller functions.
 * Each function handles a specific task such as:
 * 1. Registering a new user.
 * 2. Authenticating a user and returning a token.
 * 3. Retrieving user details.
 * 4. Logging out a user.
 * 
 * Key components include:
 * - Functions that interact with the database (through the User model) to execute CRUD operations.
 * - Error handling to manage issues that might arise during operations like database reads/writes.
 * 
 * Using controller functions improves code readability, reusability, and testing.
 */


const User = require('../models/User');  // Import the User model
const bcrypt = require('bcrypt');  // For hashing the passwords

// 1. Register a new user
exports.register = async (req, res) => {
    try {
        // Create a new user instance with data from the request body
        const user = new User(req.body);

        // Save the new user to the database
        await user.save();

        // Send a success response
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        // Handle any errors (like duplicate email/username)
        res.status(400).send({ error: error.message });
    }
};

// 2. Login an existing user
exports.login = async (req, res) => {
    try {
        // Find the user by their email and check the password
        const user = await User.findByCredentials(req.body.email, req.body.password);

        // Generate a new auth token for the user
        const token = await user.generateAuthToken();

        // Send back the token and user details
        res.send({ user, token });
    } catch (error) {
        // Handle any errors (like invalid email/password)
        res.status(400).send({ error: error.message });
    }
};

// 3. Get the authenticated user's profile
exports.getProfile = async (req, res) => {
    // Since the middleware has already authenticated and set the user, we can just return it
    res.send(req.user);
};

// 4. Logout the user from the current device
exports.logout = async (req, res) => {
    try {
        // Before filtering the tokens array, check if it exists
        if (!(req.user && req.token)) return res.status(500).send({ error: 'No tokens found for this user.' });

        // Remove the token (that was used for this request) from the user's tokens list
        req.user.tokens = req.user.tokens.filter((tokenDoc) => tokenDoc.token !== req.token);

        // Save the updated user to the database
        await req.user.save();

        // Send a success response
        res.send({ message: 'Logged out successfully!' });
    } catch (error) {
        // Handle any errors during the process
        res.status(500).send({ error: error.message });
    }
};

// 5. Logout the user from all devices
exports.logoutAll = async (req, res) => {
    try {
        // Before filtering the tokens array, check if it exists
        if (req.user && req.user.tokens) {
            req.user.tokens = req.user.tokens.filter(tokenDoc => tokenDoc.token !== req.token);
        } else {
            return res.status(500).send({ error: 'No tokens found for this user.' });
        }

        // Clear out all tokens, effectively logging the user out from all devices
        req.user.tokens = [];

        // Save the updated user to the database
        await req.user.save();

        // Send a success response
        res.send({ message: 'Logged out from all devices successfully!' });
    } catch (error) {
        // Handle any errors during the process
        res.status(500).send({ error: error.message });
    }
};
