const { query } = require("../config/db.config");

async function saveResults(formData) {
  const { student_id, department_id, company_id, grade1, grade2, grade3 } =
    formData;

  // Insert the results into the database
  await query(
    "INSERT INTO student_organization_results (student_id, department_id, company_id, grade1, grade2, grade3) VALUES (?, ?, ?, ?, ?, ?)",
    [student_id, department_id, company_id, grade1, grade2, grade3]
  );
}

module.exports = {
  saveResults,
};
