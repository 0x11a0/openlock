const Session = require('../models/Session');

// register a user for a session
exports.register = async (req, res) => {
    try {
        const session = new Session({
            ...req.body,
            user: req.user._id
        });

        console.log(session)

        // Save the session to the database
        await session.save();

        // Send a success response
        res.status(201).send(session);
    } catch (error) {
        // Handle any errors (like duplicate email/username)
        res.status(400).send({ error: error.message });
    }
};

exports.getSessions = async (req, res) => {
    try {

        const user = req.user;
        console.log(user)
        const sessions = await Session.find({ user: user.id });

        // Send a success response
        res.status(200).send({ sessions: sessions });
    } catch (error) {
        // Handle any errors (like duplicate email/username)
        res.status(400).send({ error: error.message });
    }
};