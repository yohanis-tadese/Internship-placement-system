const express = require("express");
const sendResultsController = require("../controller/results.controller");
const router = express.Router();

// Route to send results
router.post("/api/send-results", sendResultsController.sendResults);

module.exports = router;
