const express = require("express");
const studentController = require("../controller/student.controller");

const router = express.Router();

router.post("/api/student", studentController.createStudent);
router.get("/api/student", studentController.getAllStudents);
router.get("/api/student/:id", studentController.getStudents);
router.patch("/api/student/:id", studentController.updateStudent);
router.delete("/api/student/:id", studentController.deleteStudent);
router.get("/api/student/types", studentController.getStudentTypes);
router.get(
  "/api/students/:departmentType",
  studentController.getStudentsByDepartment
);
router.post("/api/student/apply", studentController.acceptStudentApplyForm);
router.get("/api/students/apply/list", studentController.getAllApplyStudents);
router.delete(
  "/api/placement-result",
  studentController.deleteAllPlacementResults
);

module.exports = router;
