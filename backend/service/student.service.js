// Import necessary dependencies
const { query } = require("../config/db.config");
const bcrypt = require("bcrypt");

// Function to hash the password using bcrypt
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Function to check if the student exists in the database
async function checkIfStudentExists(username) {
  const sql = "SELECT * FROM students WHERE username = ?";
  const rows = await query(sql, [username]);
  return rows.length > 0;
}

async function createStudent(student) {
  try {
    // Construct the username as "student_firstname_firstTwoLettersOfLastName"
    const username = `stud.${student.first_name.toLowerCase()}.${student.last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(student.password, 10);

    // Check if the student already exists
    const studentExist = await checkIfStudentExists(username);
    if (studentExist) {
      throw new Error("Student already exists.");
    }

    // Insert student details into the students table
    const insertStudentSql = `
      INSERT INTO students (
        first_name,
        last_name,
        username,
        phone_number,
        contact_email,
        gpa,
        password,
        department_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await query(insertStudentSql, [
      student.first_name,
      student.last_name,
      username,
      student.phone_number,
      student.contact_email,
      student.gpa,
      hashedPassword,
      student.department_id,
    ]);
    const studentId = result.insertId;

    return studentId;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
}

async function getStudent(studentId) {
  try {
    const sql = `
      SELECT * 
      FROM students
      WHERE student_id = ?
    `;
    const [student] = await query(sql, [studentId]);
    return student;
  } catch (error) {
    throw new Error(`Error getting student: ${error.message}`);
  }
}

// Function to get all students
async function getAllStudents() {
  try {
    const sql = `SELECT * FROM  students
    ORDER BY student_id DESC`;

    const students = await query(sql);
    return students;
  } catch (error) {
    console.error("Error getting all students:", error);
    throw new Error("Failed to get all students");
  }
}

async function updateStudent(studentId, studentData) {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      contact_email,
      password,
      gpa,
    } = studentData;

    // Hash the new password before updating
    const hashedPassword = await hashPassword(password);

    // Construct the username as "student_firstname_firstTwoLettersOfLastName"
    const username = `stud.${first_name.toLowerCase()}.${last_name
      .slice(0, 2)
      .toLowerCase()}`;

    // Update the student data including the hashed password and gpa
    const updateSql = `
      UPDATE students
      SET first_name = ?,
          last_name = ?,
          username = ?,
          phone_number = ?,
          contact_email = ?,
          gpa = ?,
          password = ?
      WHERE student_id = ?
    `;
    const result = await query(updateSql, [
      first_name,
      last_name,
      username,
      phone_number,
      contact_email,
      gpa,
      hashedPassword, // Update with hashed password
      studentId,
    ]);

    return result.affectedRows > 0;
  } catch (error) {
    throw new Error(`Error updating student: ${error.message}`);
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

async function getStudentsByDepartment(departmentType) {
  try {
    const sql = `
      SELECT * 
      FROM students
      WHERE department_id = ?
    `;
    const row = await query(sql, [departmentType]);
    return row;
  } catch (error) {
    console.error("Error getting students by department:", error.message);
    throw new Error("Failed to retrieve students by department");
  }
}

async function acceptStudentApplyForm({
  student_id,
  name,
  disability,
  gender,
  preferences,
}) {
  try {
    const insertApplyFormSql = `
      INSERT INTO student_apply_form (student_id, name, disability, gender)
      VALUES (?, ?, ?, ?)
    `;
    const result = await query(insertApplyFormSql, [
      student_id,
      name,
      disability,
      gender,
    ]);
    const apply_id = result.insertId; // Get the auto-generated apply_id

    for (let i = 0; i < preferences.length; i++) {
      const insertPreferenceSql = `
        INSERT INTO student_preferences (apply_id, preference_order, student_id, company_id)
        VALUES (?, ?, ?, ?)
      `;
      await query(insertPreferenceSql, [
        apply_id,
        i + 1,
        student_id,
        preferences[i],
      ]);
    }
  } catch (error) {
    throw new Error(
      `Error accepting student apply form and preferences: ${error.message}`
    );
  }
}

// Export the functions
module.exports = {
  checkIfStudentExists,
  createStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  getStudentsByDepartment,
  deleteStudent,
  acceptStudentApplyForm,
};
