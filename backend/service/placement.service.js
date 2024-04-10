const { query } = require("../config/db.config");

async function addPlacementResult(placement) {
  const { student_id, company_id } = placement;

  // Insert the placement result into the database using the query function
  await query(
    "INSERT INTO placement_results (student_id, company_id) VALUES (?, ?)",
    [student_id, company_id]
  );
}

// Function to fetch placement results for a specific student
async function getPlacementResult(studentId) {
  try {
    // Query the database to fetch placement results for the specified student ID
    const queryResult = await query(
      "SELECT * FROM placement_results WHERE student_id = ?",
      [studentId]
    );

    // Return the fetched placement results
    return queryResult;
  } catch (error) {
    // If an error occurs, throw the error to be caught by the controller
    throw error;
  }
}

// Function to fetch company details by company ID
async function getCompanyDetails(companyId) {
  try {
    // Query the database to fetch company details by company ID
    const queryResult = await query(
      "SELECT * FROM companies WHERE company_id = ?",
      [companyId]
    );

    // Return the fetched company details
    return queryResult[0]; // Assuming there's only one company with the given ID
  } catch (error) {
    // If an error occurs, throw the error to be caught by the controller
    throw error;
  }
}

module.exports = {
  addPlacementResult,
  getPlacementResult,
  getCompanyDetails,
};
