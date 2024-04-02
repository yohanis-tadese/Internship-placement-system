const express = require("express");
const departmentController = require("../controller/department.controler");

const router = express.Router();

router.post("/api/department", departmentController.createDepartment);

module.exports = router;
