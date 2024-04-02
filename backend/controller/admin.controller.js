// Import necessary dependencies
const adminService = require("../service/admin.service");

async function createAdmin(req, res, next) {
  try {
    // Generate the username automatically
    const username = `admin_${req.body.first_name.toLowerCase()}_${req.body.last_name
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
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
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

module.exports = {
  createAdmin,
};
