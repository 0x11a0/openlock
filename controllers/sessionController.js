
// register a user for a session
exports.register = async (req, res) => {
    try {

        // Send a success response
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        // Handle any errors (like duplicate email/username)
        res.status(400).send({ error: error.message });
    }
};