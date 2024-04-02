// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

// Function to check if the department exists in the database
async function checkIfDepartmentExists(username) {
  const sql = "SELECT * FROM departments WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

// Function to create a new department
async function createDepartment(department) {
  try {
    // Generate a unique username for the department
    const username = `dept_${department.department_name}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(department.password, 10);

    // Check if the department already exists
    const departmentExists = await checkIfDepartmentExists(username);
    if (departmentExists) {
      throw new Error("Department already exists.");
    }

    // Insert department details into the departments table
    const insertDepartmentSql = `
        INSERT INTO departments (
          department_name,
          username,
          phone_number,
          contact_email,
          office_location,
          password
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
    const result = await query(insertDepartmentSql, [
      department.department_name,
      username,
      department.phone_number,
      department.contact_email,
      department.office_location,
      hashedPassword,
    ]);
    const departmentId = result.insertId;

    return departmentId;
  } catch (error) {
    console.error("Error creating department:", error.message);
    throw new Error("Failed to create department");
  }
}

// Export the functions
module.exports = {
  checkIfDepartmentExists,
  createDepartment,
};
