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

async function updateDepartment(departmentId, departmentData) {
  try {
    const {
      department_name,
      phone_number,
      contact_email,
      office_location,
      password,
    } = departmentData;

    // Fetch the existing department data including the password
    const fetchSql = `SELECT password FROM departments WHERE department_id = ?`;
    const [existingDepartment] = await query(fetchSql, [departmentId]);

    if (!existingDepartment) {
      throw new Error("Department not found");
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      existingDepartment.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the department data including the password
    const updateSql = `
      UPDATE departments
      SET department_name = ?,
          phone_number = ?,
          contact_email = ?,
          office_location = ?,
          password = ?
      WHERE department_id = ?
    `;
    const result = await query(updateSql, [
      department_name,
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
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
