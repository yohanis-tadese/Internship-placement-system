// Import necessary dependencies
const studentService = require("../service/student.service");

async function createStudent(req, res, next) {
  try {
    // Generate the username automatically
    const username = `stud.${req.body.first_name.toLowerCase()}.${req.body.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Check if student username already exists
    const studentExists = await studentService.checkIfStudentExists(username);

    if (studentExists) {
      return res.status(400).json({
        error: "This student username already exists!",
      });
    }

    if (!req.body.department_id) {
      return res.status(400).json({
        error: "Department type is required.",
      });
    }

    // Create new student
    const studentId = await studentService.createStudent({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      contact_email: req.body.contact_email,
      gpa: req.body.gpa,
      password: req.body.password,
      department_id: req.body.department_id,
    });

    return res.status(200).json({
      status: true,
      message: "Student created successfully",
      studentId,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getStudents(req, res, next) {
  try {
    const studentId = req.params.id;
    const students = await studentService.getStudent(studentId);

    return res.status(200).json({
      status: true,
      students,
    });
  } catch (error) {
    console.error("Error getting students:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getAllStudents(req, res, next) {
  try {
    const students = await studentService.getAllStudents();

    return res.status(200).json({
      status: true,
      students,
    });
  } catch (error) {
    console.error("Error getting students:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function updateStudent(req, res, next) {
  try {
    const studentId = req.params.id;
    const updatedStudent = await studentService.updateStudent(
      studentId,
      req.body
    );

    if (!updatedStudent) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function deleteStudent(req, res, next) {
  try {
    const studentId = req.params.id;
    const deleted = await studentService.deleteStudent(studentId);

    if (!deleted) {
      return res.status(404).json({
        error: "Student not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getStudentTypes(req, res, next) {
  try {
    const studentTypes = await studentService.getStudentTypes();

    return res.status(200).json({
      status: true,
      studentTypes,
    });
  } catch (error) {
    console.error("Error getting student types:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function getStudentsByDepartment(req, res, next) {
  try {
    const departmentType = req.params.departmentType;
    const students = await studentService.getStudentsByDepartment(
      departmentType
    );

    return res.status(200).json({
      status: true,
      length: students.length,
      data: students,
    });
  } catch (error) {
    console.error("Error getting students by department:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}

async function acceptStudentApplyForm(req, res, next) {
  try {
    const { student_id, name, disability, gender, preferences } = req.body;

    // Call the combined function to accept student apply form data and preferences
    await studentService.acceptStudentApplyForm({
      student_id,
      name,
      disability,
      gender,
      preferences,
    });

    res.status(200).json({
      message: "Student apply form data and preferences inserted successfully",
    });
  } catch (error) {
    console.error("Error submitting student apply form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createStudent,
  getStudents,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentTypes,
  getStudentsByDepartment,
  acceptStudentApplyForm,
};
