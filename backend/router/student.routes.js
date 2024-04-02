const express = require("express");
const studentController = require("../controller/student.controller");

const router = express.Router();

router.post("/api/student", studentController.createStudent);

module.exports = router;
