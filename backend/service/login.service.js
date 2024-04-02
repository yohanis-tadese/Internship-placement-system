const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

async function loginStudent(username, password) {
  try {
    const sql = "SELECT * FROM students WHERE username = ?";
    const [student] = await query(sql, [username]);

    if (!student) {
      throw new Error("Student not found or invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password.");
    }

    return student;
  } catch (error) {
    console.error("Error logging in student:", error.message);
    throw new Error("Failed to authenticate student.");
  }
}

async function loginAdmin(username, password) {
  try {
    const sql = "SELECT * FROM admins WHERE username = ?";
    const [admin] = await query(sql, [username]);

    if (!admin) {
      throw new Error("Admin not found or invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password.");
    }

    return admin;
  } catch (error) {
    console.error("Error logging in admin:", error.message);
    throw new Error("Failed to authenticate admin.");
  }
}

async function loginCompany(username, password) {
  try {
    const sql = "SELECT * FROM companies WHERE username = ?";
    const [company] = await query(sql, [username]);

    if (!company) {
      throw new Error("Company not found or invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, company.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password.");
    }

    return company;
  } catch (error) {
    console.error("Error logging in company:", error.message);
    throw new Error("Failed to authenticate company.");
  }
}

async function loginDepartment(username, password) {
  try {
    const sql = "SELECT * FROM departments WHERE username = ?";
    const [department] = await query(sql, [username]);

    if (!department) {
      throw new Error("Department not found or invalid credentials.");
    }

    const passwordMatch = await bcrypt.compare(password, department.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password.");
    }

    return department;
  } catch (error) {
    console.error("Error logging in department:", error.message);
    throw new Error("Failed to authenticate department.");
  }
}

module.exports = { loginStudent, loginAdmin, loginCompany, loginDepartment };
