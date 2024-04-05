// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

// Function to hash the password using bcrypt
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

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
    const hashedPassword = await hashPassword(department.password);

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

// Function to update department details
async function updateDepartment(departmentId, departmentData) {
  try {
    const {
      department_name,
      phone_number,
      contact_email,
      office_location,
      password,
    } = departmentData;

    // Hash the password before updating
    const hashedPassword = await hashPassword(password);

    const username = `dept_${department_name}`;

    // Update the department data including the hashed password
    const updateSql = `
      UPDATE departments
      SET department_name = ?,
          username = ?,
          phone_number = ?,
          contact_email = ?,
          office_location = ?,
          password = ?
      WHERE department_id = ?
    `;
    const result = await query(updateSql, [
      department_name,
      username,
      phone_number,
      contact_email,
      office_location,
      hashedPassword, // Update with hashed password
      departmentId,
    ]);

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error updating department: ${error.message}`);
  }
}

async function getDepartment(departmentId) {
  try {
    const sql = `
      SELECT * 
      FROM departments
      WHERE department_id = ?
    `;
    const [department] = await query(sql, [departmentId]);
    return department;
  } catch (error) {
    throw new Error(`Error getting department: ${error.message}`);
  }
}

async function getAllDepartments() {
  try {
    const sql = `
      SELECT * 
      FROM departments
      ORDER BY department_id DESC
      LIMIT 10
    `;
    const rows = await query(sql);
    return rows;
  } catch (error) {
    throw new Error(`Error getting all departments: ${error.message}`);
  }
}

async function deleteDepartment(departmentId) {
  try {
    // Check if departmentId is undefined
    if (departmentId === undefined) {
      throw new Error("Department ID is undefined");
    }

    const deleteSql = "DELETE FROM departments WHERE department_id = ?";
    const result = await query(deleteSql, [departmentId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error deleting department: ${error.message}`);
  }
}

// Export the functions
module.exports = {
  checkIfDepartmentExists,
  createDepartment,
  getDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
