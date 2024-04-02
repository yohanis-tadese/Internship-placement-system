// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

// Function to check if the company exists in the database
async function checkIfCompanyExists(username) {
  const sql = "SELECT * FROM companies WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

// Function to create a new company
async function createCompany(company) {
  try {
    // Generate a unique username for the company
    const username = `comp_${company.company_name}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(company.password, 10);

    // Check if the company already exists
    const companyExists = await checkIfCompanyExists(username);
    if (companyExists) {
      throw new Error("Company already exists.");
    }

    // Insert company details into the companies table
    const insertCompanySql = `
        INSERT INTO companies (
          company_name,
          username,
          phone_number,
          contact_email,
          location,
          industry_sector,
          accepted_student_limit,
          password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
    const result = await query(insertCompanySql, [
      company.company_name,
      username,
      company.phone_number,
      company.contact_email,
      company.location,
      company.industry_sector,
      company.accepted_student_limit,
      hashedPassword,
    ]);
    const companyId = result.insertId;

    return companyId;
  } catch (error) {
    console.error("Error creating company:", error.message);
    throw new Error("Failed to create company");
  }
}

// Export the functions
module.exports = {
  checkIfCompanyExists,
  createCompany,
};
