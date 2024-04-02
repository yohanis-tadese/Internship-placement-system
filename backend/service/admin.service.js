// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

// Function to check if the admin exists in the database
async function checkIfAdminExists(username) {
  const sql = "SELECT * FROM admins WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

// Function to create a new admin
async function createAdmin(admin) {
  try {
    // Construct the username as "admin_firstname_firstTwoLettersOfLastName"
    const username = `admin_${admin.first_name.toLowerCase()}_${admin.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    // Check if the admin already exists
    const adminExists = await checkIfAdminExists(username);
    if (adminExists) {
      throw new Error("Admin already exists.");
    }

    // Insert admin details into the admins table
    const insertAdminSql = `
        INSERT INTO admins (
          first_name,
          last_name,
          username,
          email,
          password
        ) VALUES (?, ?, ?, ?, ?)
      `;
    const result = await query(insertAdminSql, [
      admin.first_name,
      admin.last_name,
      username,
      admin.email,
      hashedPassword,
    ]);
    const adminId = result.insertId;

    return adminId;
  } catch (error) {
    console.error("Error creating admin:", error.message);
    throw new Error("Failed to create admin");
  }
}

module.exports = {
  checkIfAdminExists,
  createAdmin,
};
