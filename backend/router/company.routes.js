const express = require("express");
const companyController = require("../controller/company.controller");
const router = express.Router();

router.post("/api/company", companyController.createCompany);
router.get("/api/company", companyController.getAllCompanies);
router.get("/api/company/:id", companyController.getCompany);
router.patch("/api/company/:id", companyController.updateCompany);
router.delete("/api/company/:id", companyController.deleteCompany);

module.exports = router;
