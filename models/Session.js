require('dotenv').config();

// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the User schema for Mongoose
const sessionSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    tokens: [{
        token: {
            type: String,
            required: true // Storing JWT tokens associated with the user
        }
    }]
});

// Mongoose "pre" middleware: this code runs before a User document is saved
sessionSchema.pre('save', async function (next) {
    const user = this;  // Get the current user

    // Check if the password field was modified (or is new)
    if (user.isModified('password')) {
        // Hash the password using bcrypt
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();  // Proceed to the next middleware (or save)
});

// Method to generate a JWT for the user
sessionSchema.methods.generateAuthToken = async function () {
    const user = this;
    // Create a JWT, using the user's ID as payload and signing with the secret from .env
    // The token will expire as specified in .env (e.g., "7 days")
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });

    // Store the generated token in the tokens array of the user
    user.tokens = user.tokens.concat({ token });
    await user.save();  // Save the user document with the new token

    return token;
};

// Static method to find a user by email and verify password
sessionSchema.statics.findByCredentials = async (email, password) => {
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
const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
