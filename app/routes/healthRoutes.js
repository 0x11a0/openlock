const express = require("express");
const healthController = require("../controllers/healthController");

const router = express.Router();

router.get("/health", healthController.health);

// Export the router to be used in the main app.js or server.js file
module.exports = router;
