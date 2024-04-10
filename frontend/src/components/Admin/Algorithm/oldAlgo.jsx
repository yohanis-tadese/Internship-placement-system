// import React, { useState } from "react";
import { companiesData } from "./company";
import { studentsData } from "./student";

function Data() {
  return (
    <StudentPlacement
      studentsData={studentsData}
      companiesData={companiesData}
    />
  );
}

// const WEIGHT_DISABILITY = 10;
// const WEIGHT_GENDER = 10;
// const WEIGHT_PREFERENCE = 50;
// const WEIGHT_GRADE = 30;

// const StudentPlacement = ({ studentsData, companiesData }) => {
//   const [placementResults, setPlacementResults] = useState({});

//   const calculateRank = (student, company) => {
//     let rank = 0;

//     rank += WEIGHT_DISABILITY * (student.disability ? 1 : 0);
//     rank += WEIGHT_GENDER * (student.gender === "female" ? 1 : 0);
//     rank += WEIGHT_GRADE * (student.gpa / 4);

//     const preferenceIndex = student.preferences.findIndex(
//       (pref) => pref === company.company_id
//     );
//     rank +=
//       WEIGHT_PREFERENCE *
//       (preferenceIndex !== -1 ? 1 / (preferenceIndex + 1) : 0);

//     return rank;
//   };

//   const assignStudentsToCompanies = () => {
//     const updatedAssignedStudents = {};

//     const studentPreferences = new Map();
//     const assignedStudentSet = new Set();

//     studentsData.forEach((student) => {
//       student.preferences.forEach((pref) => {
//         if (studentPreferences.has(pref)) {
//           studentPreferences.get(pref).push(student.student_id);
//         } else {
//           studentPreferences.set(pref, [student.student_id]);
//         }
//       });
//     });

//     companiesData.forEach((company) => {
//       updatedAssignedStudents[company.company_name] = [];

//       const companyPreferences = studentsData.map((student) => ({
//         student_id: student.student_id,
//         rank: calculateRank(student, company),
//       }));

//       companyPreferences.sort((a, b) => b.rank - a.rank);

//       companyPreferences.forEach((pref) => {
//         const studentId = pref.student_id;
//         const studentPref = studentPreferences.get(company.company_id);
//         const studentIndex = studentPref ? studentPref.indexOf(studentId) : -1;
//         if (
//           studentIndex !== -1 &&
//           updatedAssignedStudents[company.company_name].length <
//             company.accepted_students_limit &&
//           !assignedStudentSet.has(studentId)
//         ) {
//           updatedAssignedStudents[company.company_name].push(
//             studentsData.find((student) => student.student_id === studentId)
//           );
//           assignedStudentSet.add(studentId); // Mark student as assigned
//         }
//       });
//     });

//     setPlacementResults(updatedAssignedStudents);
//   };

//   return (
//     <div>
//       <button
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontSize: "16px",
//           fontWeight: "bold",
//           marginBottom: "20px",
//         }}
//         onClick={assignStudentsToCompanies}
//       >
//         Place Students
//       </button>
//       <div>
//         <h3>Assigned Students:</h3>
//         {Object.entries(placementResults).map(([companyName, students]) => (
//           <p key={companyName}>
//             {companyName}: {students.map((student) => student.name).join(", ")}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Data;
