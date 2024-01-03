/**
 * auth.js (middleware)
 * 
 * This middleware ensures that certain routes of our application are protected and can only be accessed by authenticated users.
 * When a request is made to a protected route:
 * 1. This middleware checks for the presence of a token in the request headers.
 * 2. If a token is found, it is verified using a secret key.
 * 3. If the token is valid, the request is allowed to proceed; otherwise, an error is thrown.
 * 
 * Key components include:
 * - Token extraction from the 'Authorization' header.
 * - Token verification using the JSON Web Token (JWT) library.
 * - Addition of the user's decoded data to the request object for subsequent middleware or controllers.
 * 
 * This acts as a gatekeeper, ensuring that only authenticated requests can interact with protected endpoints.
 */

// Import the 'jsonwebtoken' library for handling JSON Web Tokens
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    try {
        // Get the 'authorization' header from the incoming request
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the ID from the token
        const user = await User.findById(decodedData._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // Attach the user and token to the request object
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        // Handle errors, such as an invalid or expired token
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
