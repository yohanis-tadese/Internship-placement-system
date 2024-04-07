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
      department_type: req.body.department_type,
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

async function getDepartment(req, res, next) {
  try {
    const departmentId = req.params.id;
    const department = await departmentService.getDepartment(departmentId);

    if (!department) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    return res.status(200).json({
      status: true,
      department,
    });
  } catch (error) {
    console.error("Error getting department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getAllDepartments(req, res, next) {
  try {
    const department = await departmentService.getAllDepartments();

    if (!department) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    return res.status(200).json({
      status: true,
      department,
    });
  } catch (error) {
    console.error("Error getting department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function updateDepartment(req, res, next) {
  try {
    const departmentId = req.params.id;
    const updatedDepartment = await departmentService.updateDepartment(
      departmentId,
      req.body
    );

    if (!updatedDepartment) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Department updated successfully",
      department: updatedDepartment,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function deleteDepartment(req, res, next) {
  try {
    const departmentId = req.params.id;
    const deleted = await departmentService.deleteDepartment(departmentId);

    if (!deleted) {
      return res.status(404).json({
        error: "Department not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getDepartmentTypes(req, res, next) {
  try {
    const departmentTypes = await departmentService.getDepartmentTypes();

    if (!departmentTypes || departmentTypes.length === 0) {
      return res.status(404).json({
        error: "Department types not found",
      });
    }

    return res.status(200).json({
      status: true,
      departmentTypes,
    });
  } catch (error) {
    console.error("Error getting department types:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

module.exports = {
  createDepartment,
  getDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartmentTypes,
};
