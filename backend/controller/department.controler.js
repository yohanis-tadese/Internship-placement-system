// Import necessary dependencies
const departmentService = require("../service/department.service");

async function createDepartment(req, res, next) {
  try {
    // Generate the username automatically
    const username = `dept_${req.body.department_name}`;
    // Check if department name already exists
    const departmentExists = await departmentService.checkIfDepartmentExists(
      username
    );

    if (departmentExists) {
      return res.status(400).json({
        error: "This department name already exists!",
      });
    }

    // Create new department
    const departmentId = await departmentService.createDepartment({
      department_name: req.body.department_name,
      phone_number: req.body.phone_number,
      contact_email: req.body.contact_email,
      office_location: req.body.office_location,
      password: req.body.password,
    });

    return res.status(200).json({
      status: true,
      message: "Department created successfully",
      departmentId,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  createDepartment,
};
