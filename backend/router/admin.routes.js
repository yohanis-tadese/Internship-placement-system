const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");

router.post("/api/admin", adminController.createAdmin);
router.get("/api/admin", adminController.getAllAdmins);

module.exports = router;
