// index.js
const express = require('express');
const app = express();
const config = require('./config');
const errorMiddleware = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const commandRoutes = require('./routes/commandRoutes');
const { forwardCommand, getStatus } = require('./services/commandService');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/command', commandRoutes);

app.use(errorMiddleware);

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

module.exports = server;
