// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

// Function to check if the student exists in the database
async function checkIfStudentExists(username) {
  const sql = "SELECT * FROM students WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

// Function to create a new student
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

    // Insert student details into the students table
    const insertStudentSql = `
        INSERT INTO students (
          first_name,
          last_name,
          username,
          phone_number,
          contact_email,
          password
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
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

// Function to get all students
async function getAllStudents() {
  try {
    const sql = "SELECT * FROM students";
    const students = await query(sql);
    return students;
  } catch (error) {
    console.error("Error getting all students:", error);
    throw new Error("Failed to get all students");
  }
}

// Function to update an existing student
async function updateStudent(studentId, studentData) {
  try {
    const { first_name, last_name, phone_number, contact_email, password } =
      studentData;

    // Fetch the existing student data including the password
    const fetchSql = `SELECT password FROM students WHERE student_id = ?`;
    const [existingStudent] = await query(fetchSql, [studentId]);

    if (!existingStudent) {
      throw new Error("Student not found");
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      existingStudent.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the student data including the password
    const updateSql = `
      UPDATE students
      SET first_name = ?,
          last_name = ?,
          phone_number = ?,
          contact_email = ?,
          password = ?
      WHERE student_id = ?
    `;
    const result = await query(updateSql, [
      first_name,
      last_name,
      phone_number,
      contact_email,
      hashedPassword, // Update with hashed password
      studentId,
    ]);

    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error updating student:", error);
    throw new Error("Failed to update student");
  }
}

// Function to delete an existing student
async function deleteStudent(studentId) {
  try {
    // Check if studentId is undefined
    if (studentId === undefined) {
      throw new Error("Student ID is undefined");
    }

    const deleteSql = "DELETE FROM students WHERE student_id = ?";
    const result = await query(deleteSql, [studentId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting student:", error.message);
    throw new Error("Failed to delete student");
  }
}

// Export the functions
module.exports = {
  checkIfStudentExists,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
