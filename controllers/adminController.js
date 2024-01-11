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

exports.createAdmin = async (req, res) => {
    try {
        // Assuming the user has been authenticated and their details are in req.user
        const isAdmin = req.user && req.user.role === 'admin';

        const { role, ...userData } = req.body;

        // If the requester is an admin, use the provided role; otherwise, default to 'user'
        const newUserRole = isAdmin && role ? role : 'user';

        const user = new User({ ...userData, role: newUserRole });

        // Save the new user to the database
        await user.save();

        // Send a success response
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        // Handle any errors (like duplicate email/username)
        res.status(400).send({ error: error.message });
    }
};