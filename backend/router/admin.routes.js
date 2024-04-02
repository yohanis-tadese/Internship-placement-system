const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

router.post("/api/admin", adminController.createAdmin);

module.exports = router;
