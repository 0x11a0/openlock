// Import required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bodyParser = require("body-parser");

const esp32Routes = require("./routes/esp32Routes");
const healthRoutes = require("./routes/healthRoutes");

// Create an instance of Express
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Use bodyParser to parse JSON payloads
app.use(bodyParser.json());

// Use our routes with the Express application
app.use("/api/esp32", esp32Routes);
app.use("/health", healthRoutes);

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
