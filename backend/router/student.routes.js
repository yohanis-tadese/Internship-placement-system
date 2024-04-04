const express = require("express");
const studentController = require("../controller/student.controller");

const router = express.Router();

router.post("/api/student", studentController.createStudent);
router.get("/api/student", studentController.getAllStudents);
router.patch("/api/student/:id", studentController.updateStudent);
router.delete("/api/student/:id", studentController.deleteStudent);

module.exports = router;
