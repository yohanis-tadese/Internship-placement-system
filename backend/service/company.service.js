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

// Function to get all companies
async function getAllCompanies() {
  try {
    const sql = "SELECT * FROM companies";
    const companies = await query(sql);
    return companies;
  } catch (error) {
    console.error("Error getting all companies:", error.message);
    throw new Error("Failed to get all companies");
  }
}

// Function to update an existing company
async function updateCompany(companyId, companyData) {
  try {
    const {
      company_name,
      phone_number,
      contact_email,
      location,
      industry_sector,
      password,
    } = companyData;

    // Fetch the existing company data including the password
    const fetchSql = `SELECT password FROM companies WHERE company_id = ?`;
    const [existingCompany] = await query(fetchSql, [companyId]);

    if (!existingCompany) {
      throw new Error("Company not found");
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      existingCompany.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the company data including the password
    const updateSql = `
      UPDATE companies
      SET company_name = ?,
          phone_number = ?,
          contact_email = ?,
          location = ?,
          industry_sector = ?,
          password = ?
      WHERE company_id = ?
    `;
    const result = await query(updateSql, [
      company_name,
      phone_number,
      contact_email,
      location,
      industry_sector,
      hashedPassword, // Update with hashed password
      companyId,
    ]);

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating company:", error.message);
    throw new Error("Failed to update company");
  }
}

// Function to delete an existing company
async function deleteCompany(companyId) {
  try {
    // Check if companyId is undefined
    if (companyId === undefined) {
      throw new Error("Company ID is undefined");
    }

    const deleteSql = "DELETE FROM companies WHERE company_id = ?";
    const result = await query(deleteSql, [companyId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting company:", error.message);
    throw new Error("Failed to delete company");
  }
}

// Export the functions
module.exports = {
  checkIfCompanyExists,
  createCompany,
  updateCompany,
  deleteCompany,
  getAllCompanies,
};
