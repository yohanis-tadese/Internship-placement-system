// Import necessary dependencies
const studentService = require("../service/student.service");

async function createStudent(req, res, next) {
  try {
    // Generate the username automatically
    const username = `stud_${req.body.first_name.toLowerCase()}_${req.body.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Check if student username already exists
    const studentExists = await studentService.checkIfStudentExists(username);

    if (studentExists) {
      return res.status(400).json({
        error: "This student username already exists!",
      });
    }

    // Create new student
    const studentId = await studentService.createStudent({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      contact_email: req.body.contact_email,
      password: req.body.password,
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

module.exports = {
  createStudent,
};
