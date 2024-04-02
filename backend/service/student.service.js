const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

async function checkIfStudentExists(username) {
  const sql = "SELECT * FROM students WHERE username = ?";
  const rows = await query(sql, [username]);

  return rows.length > 0;
}

async function createStudent(student) {
  try {
    // Construct the username as "student_firstname_firstTwoLettersOfLastName"
    const username = `stud_${student.first_name.toLowerCase()}_${student.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(student.password, 10);

    // Check if the student already exists
    const studentExist = await checkIfStudentExists(username);
    if (studentExist) {
      throw new Error("Student is already exists.");
    }

    const insertStudentSql =
      "INSERT INTO students (first_name, last_name, username, phone_number, contact_email, password) VALUES (?, ?, ?, ?, ?, ?)";
    const result = await query(insertStudentSql, [
      student.first_name,
      student.last_name,
      username,
      student.phone_number,
      student.contact_email,
      hashedPassword,
    ]);
    const studentId = result.insertId;

    return studentId;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
}

module.exports = {
  createStudent,
  checkIfStudentExists,
};
