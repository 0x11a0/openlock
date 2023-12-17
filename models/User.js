/**
 * User.js (userModel)
 * 
 * This file defines the structure and behavior of the 'User' data model in our application.
 * It uses the Mongoose library to:
 * 1. Define the schema (structure) for user-related data, including validation and indexing.
 * 2. Implement functions to handle user-specific behaviors such as password hashing before saving and token generation.
 * 3. Define static methods for finding a user based on their credentials.
 * 
 * Key components include:
 * - User schema definition with fields like `username`, `email`, and `password`.
 * - Middleware to hash passwords before a user is saved to the database.
 * - A method for generating authentication tokens.
 * - A static method for authenticating users based on email and password.
 * 
 * This model acts as a bridge between our application logic and the MongoDB database.
 */

// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the User schema for Mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // This field is mandatory
        unique: true     // Each user must have a unique username
    },
    email: {
        type: String,
        required: true,  // This field is mandatory
        unique: true     // Each user must have a unique email
    },
    password: {
        type: String,
        required: true   // Password is also mandatory
    },
    tokens: [{
        token: {
            type: String,
            required: true // Storing JWT tokens associated with the user
        }
    }]
});

// Mongoose "pre" middleware: this code runs before a User document is saved
userSchema.pre('save', async function(next) {
    const user = this;  // Get the current user

    // Check if the password field was modified (or is new)
    if (user.isModified('password')) {
        // Hash the password using bcrypt
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();  // Proceed to the next middleware (or save)
});

// Method to generate a JWT for the user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    // Create a JWT, using the user's ID as payload and signing with the secret from .env
    // The token will expire as specified in .env (e.g., "7 days")
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

    // Store the generated token in the tokens array of the user
    user.tokens = user.tokens.concat({token});
    await user.save();  // Save the user document with the new token

    return token;
};

// Static method to find a user by email and verify password
userSchema.statics.findByCredentials = async (email, password) => {
    // Try to find a user with the given email
    const user = await User.findOne({ email });

    // If no user was found, throw an error
    if (!user) {
        throw new Error('Unable to login');
    }

    // If a user was found, check if the given password matches the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, throw an error
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    // If everything is good, return the user
    return user;
};

// Create a Mongoose model based on the schema, and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
