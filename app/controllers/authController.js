const jwt = require('jsonwebtoken');
const config = require('../config');
const { validateUser } = require('../services/authService');

exports.login = async (req, res) => {
  const { email, websiteUrl } = req.body;

  const user = await validateUser(email, websiteUrl);
  if (!user) return res.status(400).send('Invalid email or website URL.');

  const token = jwt.sign({ email, websiteUrl }, config.jwtSecret);
  res.send({ token });
};
