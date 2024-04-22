const { query } = require("../config/db.config");

async function saveResults(formData) {
  const {
    student_id,
    department_id,
    company_id,
    commitment,
    courtesy,
    conduct,
    perseverance,
    teamwork,
    professional_ethics,
    creativity,
    technical_knowledge,
    efficiency,
    professional_comments,
    attendance,
    advisor_name,
    department_assigned,
    attachment_from_date,
    attachment_to_date,
    area_of_work,
    total_hours,
  } = formData;

  // Insert the results into the database
  await query(
    "INSERT INTO student_organizational_result (student_id, department_id, company_id, commitment, courtesy, conduct, perseverance, teamwork, professional_ethics, creativity, technical_knowledge, efficiency, professional_comments, attendance, advisor_name, department_assigned, attachment_from_date, attachment_to_date, area_of_work, total_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      student_id,
      department_id,
      company_id,
      commitment,
      courtesy,
      conduct,
      perseverance,
      teamwork,
      professional_ethics,
      creativity,
      technical_knowledge,
      efficiency,
      professional_comments,
      attendance,
      advisor_name,
      department_assigned,
      attachment_from_date,
      attachment_to_date,
      area_of_work,
      total_hours,
    ]
  );
}

module.exports = {
  saveResults,
};
