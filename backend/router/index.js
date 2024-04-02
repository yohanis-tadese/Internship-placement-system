const express = require("express");
const router = express.Router();

const installRouter = require("./install.routes");
const studentRouter = require("./student.routes");
const adminRouter = require("./admin.routes");
const companyRouter = require("./company.routes");
const departmentRouter = require("./department.routes");
const loginRouter = require("./login.routes");

router.use(installRouter);
router.use(studentRouter);
router.use(adminRouter);
router.use(companyRouter);
router.use(departmentRouter);
router.use(loginRouter);

module.exports = router;
