// setupAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User'); // Path to your User model
const bcrypt = require('bcrypt');

function createAdmin() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(async () => {
        const adminUser = new User({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'admin'
        });

        await adminUser.save();
        console.log('Master admin created successfully!');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    })
}

createAdmin();
