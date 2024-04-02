// Import necessary dependencies
const companyService = require("../service//company.service");

async function createCompany(req, res, next) {
  try {
    // Generate the username automatically
    const username = `Comp_${req.body.company_name}`;
    // Check if company name already exists
    const companyExists = await companyService.checkIfCompanyExists(username);

    if (companyExists) {
      return res.status(400).json({
        error: "This company name already exists!",
      });
    }

    // Create new company
    const companyId = await companyService.createCompany({
      company_name: req.body.company_name,
      phone_number: req.body.phone_number,
      contact_email: req.body.contact_email,
      location: req.body.location,
      industry_sector: req.body.industry_sector,
      accepted_student_limit: req.body.accepted_student_limit,
      password: req.body.password,
    });

    return res.status(200).json({
      status: true,
      message: "Company created successfully",
      companyId,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  createCompany,
};
