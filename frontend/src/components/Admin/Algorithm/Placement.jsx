import React, { useState, useEffect } from "react";
import styled from "styled-components";
import studentService from "../../../services/student.service";
import placementService from "../../../services/placement.service";
import criteriaService from "../../../services/criteria.service";
import companyService from "../../../services/company.service";
import ApplyStudentList from "../ApplyStudentList/ApplyStudentList";
import ConfirmationDialog from "./ConfirmationDialog";

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) =>
    props.primary === "true" ? "#007bff" : "#FF0000"};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-right: ${(props) => (props.marginRight ? "30px" : "0")};
`;

const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StudentPlacement = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [weightDisability, setWeightDisability] = useState(0);
  const [weightGender, setWeightGender] = useState(0);
  const [weightPreference, setWeightPreference] = useState(0);
  const [weightGrade, setWeightGrade] = useState(0);
  const [placementGenerated, setPlacementGenerated] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchData();
    updateWeights();
    // Check if placement status is stored in localStorage
    const storedPlacementStatus = localStorage.getItem("placementGenerated");
    if (storedPlacementStatus) {
      setPlacementGenerated(JSON.parse(storedPlacementStatus));
      setShowCompany(JSON.parse(storedPlacementStatus));
    }
  }, []);

  useEffect(() => {
    // Store placement status in localStorage
    localStorage.setItem("placementGenerated", placementGenerated);
  }, [placementGenerated]);

  const fetchData = async () => {
    try {
      const response = await companyService.getAllCompanies();

      if (response.ok) {
        const data = await response.json();

        setCompaniesData(data.companies);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateWeights = async () => {
    try {
      const criteriaId = 1;
      const criteriaData = await criteriaService.getCriteriaById(criteriaId);
      setWeightDisability(criteriaData.data.weight_disability);
      setWeightGender(criteriaData.data.weight_gender);
      setWeightPreference(criteriaData.data.weight_preference);
      setWeightGrade(criteriaData.data.weight_grade);
    } catch (error) {
      console.error("Error updating weights:", error);
    }
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
      const assignedStudents = {};
      const studentPreferences = new Map();
      const assignedStudentSet = new Set();

      const studentsResponse = await studentService.getAllApplyStudents();
      if (!studentsResponse || !studentsResponse.status) {
        console.error("Failed to fetch student data");
        return;
      }

      const studentsData = studentsResponse.students;

      studentsData.forEach((student) => {
        const preferences = student.preferences.split(",").map(Number); // Parse preferences into an array of numbers
        student.preferences = preferences; // Update student object with parsed preferences array

        preferences.forEach((pref) => {
          if (studentPreferences.has(pref)) {
            studentPreferences.get(pref).push(student.student_id);
          } else {
            studentPreferences.set(pref, [student.student_id]);
          }
        });
      });

      await Promise.all(
        companiesData.map(async (company) => {
          assignedStudents[company.company_name] = [];
          const companyPreferences = studentsData.map((student) => ({
            student_id: student.student_id,
            rank: calculateRank(student, company),
          }));

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
              assignedStudentSet.add(studentId);
            }
          });
        })
      );

      const flattenedResults = Object.values(assignedStudents).reduce(
        (acc, val) => acc.concat(val),
        []
      );

      const data = await placementService.sendPlacementResults(
        flattenedResults
      );
    } catch (error) {
      console.error("Error assigning students:", error);
    }
  }

  const handleResetPlacement = async () => {
    try {
      const response = await studentService.deleteAllPlacementResults();
      if (response) {
        console.log("Placement results reset successfully.");
      } else {
        console.error("Failed to reset placement results");
      }
    } catch (error) {
      console.error("Error resetting placement results:", error);
    }
    setShowConfirmation(false);
    setPlacementGenerated(false);
    setShowCompany(false);
  };

  return (
    <div>
      <Hr />
      {!placementGenerated ? (
        <Button
          primary={placementGenerated ? "false" : "true"}
          onClick={() => {
            assignStudentsToCompanies();
            setPlacementGenerated(true);
            setShowCompany(true);
          }}
        >
          Generate placement
        </Button>
      ) : (
        <>
          <Button primary="false" onClick={() => setShowConfirmation(true)}>
            Reset placement
          </Button>

          {showConfirmation && (
            <ConfirmationDialog
              message="Are you sure you want to reset placement? you agree deleted all placement results from the database."
              onConfirm={handleResetPlacement}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </>
      )}
      <Hr />
      <ApplyStudentList
        showCompany={showCompany}
        companiesData={companiesData}
      />
    </div>
  );
};

export default StudentPlacement;
