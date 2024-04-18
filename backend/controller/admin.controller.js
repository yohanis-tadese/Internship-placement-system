const adminService = require("../service/admin.service");

async function createAdmin(req, res, next) {
  try {
    // Check if all required fields exist in req.body
    const { first_name, last_name, email, password } = req.body;

    // Generate the username automatically
    const username = `admin.${first_name.toLowerCase()}.${last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Check if admin username already exists
    const adminExists = await adminService.checkIfAdminExists(username);

    if (adminExists) {
      return res.status(400).json({
        error: "This admin username already exists!",
      });
    }

    // Create new admin
    const adminId = await adminService.createAdmin({
      first_name,
      last_name,
      email,
      password,
    });

    return res.status(200).json({
      status: true,
      message: "Admin created successfully",
      adminId,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getAllAdmins(req, res, next) {
  try {
    const admins = await adminService.getAllAdmins(); // Implement this function in your admin service
    return res.status(200).json({
      status: true,
      admins,
    });
  } catch (error) {
    console.error("Error getting all admins:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function uploadPhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Logic to save file path to database or perform any other necessary operations
    const filePath = req.file.path;

    // Call service function to update admin photo
    await adminService.updateAdminPhoto(filePath);

    return res.status(200).json({
      status: true,
      message: "Photo uploaded successfully",
      filePath,
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createAdmin,
  getAllAdmins,
  uploadPhoto,
};
