const express = require("express");
const companyController = require("../controller/company.controller");
const router = express.Router();

router.post("/api/company", companyController.createCompany);

module.exports = router;
