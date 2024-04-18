import React, { useState, useEffect } from "react";
import { studentsData } from "./student";
import placementService from "../../../services/placement.service";
import criteriaService from "../../../services/criteria.service";
import companyService from "../../../services/company.service";

// Import the frontend service
function Data() {
  const [placementResults, setPlacementResults] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);

  // Define weights as lowercase variables
  const [weightDisability, setWeightDisability] = useState(0);
  const [weightGender, setWeightGender] = useState(0);
  const [weightPreference, setWeightPreference] = useState(0);
  const [weightGrade, setWeightGrade] = useState(0);

  useEffect(() => {
    fetchData();
    updateWeights();
  }, []);

  const fetchData = async () => {
    try {
      const response = await companyService.getAllCompanies();

      if (response.ok) {
        const data = await response.json();

        setCompaniesData(data.companies);
        console.log("hello companyyyyy", companiesData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch criteria data and update weights
  const updateWeights = async () => {
    try {
      // Assuming criteriaId is available from props or context
      const criteriaId = 1; // Example criteria ID
      const criteriaData = await criteriaService.getCriteriaById(criteriaId);
      // Update weights locally based on criteria data
      setWeightDisability(criteriaData.data.weight_disability);
      setWeightGender(criteriaData.data.weight_gender);
      setWeightPreference(criteriaData.data.weight_preference);
      setWeightGrade(criteriaData.data.weight_grade);
    } catch (error) {}
  };

  const calculateRank = (student, company) => {
    let rank = 0;

    rank += weightDisability * (student.disability ? 1 : 0);
    rank += weightGender * (student.gender === "female" ? 1 : 0);
    rank += weightGrade * (student.gpa / 4);

    const preferenceIndex = student.preferences.findIndex(
      (pref) => pref === company.company_id
    );
    rank +=
      weightPreference *
      (preferenceIndex !== -1 ? 1 / (preferenceIndex + 5) : 0);

    return rank;
  };

  async function assignStudentsToCompanies() {
    try {
      // Reset assignedStudents object
      const assignedStudents = {};
      const studentPreferences = new Map();
      const assignedStudentSet = new Set();

      studentsData.forEach((student) => {
        student.preferences.forEach((pref) => {
          if (studentPreferences.has(pref)) {
            studentPreferences.get(pref).push(student.student_id);
          } else {
            studentPreferences.set(pref, [student.student_id]);
          }
        });
      });

      // Iterate over each company
      await Promise.all(
        companiesData.map(async (company) => {
          assignedStudents[company.company_name] = [];
          const companyPreferences = studentsData.map((student) => ({
            student_id: student.student_id,
            rank: calculateRank(student, company),
          }));

          // Sort the preference list based on ranks
          companyPreferences.sort((a, b) => b.rank - a.rank);

          companyPreferences.forEach((pref) => {
            const studentId = pref.student_id;
            const studentPref = studentPreferences.get(company.company_id);
            const studentIndex = studentPref
              ? studentPref.indexOf(studentId)
              : -1;
            if (
              studentIndex !== -1 &&
              assignedStudents[company.company_name].length <
                company.accepted_student_limit &&
              !assignedStudentSet.has(studentId)
            ) {
              assignedStudents[company.company_name].push({
                student_id: studentId,
                company_id: company.company_id,
              });
              assignedStudentSet.add(studentId); // Mark student as assigned
            }
          });
        })
      );

      // Flatten the assigned students object into an array
      const flattenedResults = Object.values(assignedStudents).reduce(
        (acc, val) => acc.concat(val),
        []
      );

      // Send placement results to the backend
      const data = await placementService.sendPlacementResults(
        flattenedResults
      );
      console.log("Placement results stored successfully", data);
      setPlacementResults(flattenedResults); // Update state with placement results

      console.log("Assigned students", assignedStudents);
    } catch (error) {
      console.error("Error assigning students:", error);
    }
  }

  return (
    <div>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
        onClick={assignStudentsToCompanies}
      >
        Place Students
      </button>
      <div>
        <h3>Assigned Students:</h3>

        {placementResults.map((result, index) => (
          <div key={index}>
            <h1>{result.company_id}</h1>
            <ul>
              <li key={result.student_id}>{result.student_id}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
