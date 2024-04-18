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
    const username = `admin.${admin.first_name.toLowerCase()}.${admin.last_name
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

// Function to retrieve all admins from the database
async function getAllAdmins() {
  try {
    const sql = "SELECT * FROM admins";
    const admins = await query(sql);
    return admins;
  } catch (error) {
    console.error("Error retrieving admins:", error.message);
    throw new Error("Failed to retrieve admins");
  }
}

async function updateAdminPhoto(photoPath) {
  try {
    const updatePhotoSql = "UPDATE admins SET photo = ? WHERE id = ?";
    await query(updatePhotoSql, [photoPath]);
  } catch (error) {
    console.error("Error updating admin photo:", error.message);
    throw new Error("Failed to update admin photo");
  }
}

module.exports = {
  checkIfAdminExists,
  createAdmin,
  getAllAdmins,
  updateAdminPhoto,
};
