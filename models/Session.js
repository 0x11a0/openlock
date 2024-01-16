const mongoose = require('mongoose');

// Assuming User model is defined elsewhere and imported here
const User = require('./User');

// Define the Session schema
const sessionSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This creates a reference to the User model
    }
    // Include other fields as necessary
});

// Create a Mongoose model based on the schema
const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
