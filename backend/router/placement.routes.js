const express = require("express");
const placementController = require("../controller/placement.controller");
const router = express.Router();

// Route to add placement result
router.post("/api/placement", placementController.addPlacementResult);

// Route to fetch placement results for a specific student
router.get("/api/placement/:studentId", placementController.getPlacementResult);

module.exports = router;
