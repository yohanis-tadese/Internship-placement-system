import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import companyService from "../../services/company.service";
import "bootstrap/dist/css/bootstrap.min.css";

// Styled components for styling
const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 68px auto;
`;

const CriteriaStyle = styled.div`
  background-color: var(--color-grey-0);
  min-height: 100vh;
`;

const Form = styled.form`
  background-color: var(--color-grey-50);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 600px;
  margin: 68px auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004499;
  }
`;

const StudentPlacementForm = () => {
  const [companies, setCompanies] = useState([]);
  const [studentPreferences, setStudentPreferences] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await companyService.getAllCompanies();
        if (response.ok) {
          const data = await response.json();
          if (data && data.companies) {
            setCompanies(data.companies);
            // Initialize student preferences
            const initialStudentPreferences = Array.from({ length: 1 }, () =>
              Array.from({ length: data.companies.length }, () => "")
            );
            setStudentPreferences(initialStudentPreferences);
          } else {
            console.error("Failed to fetch companies:", data);
          }
        } else {
          console.error("Failed to fetch companies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchData();
  }, []);

  const handlePreferenceChange = (e, studentIndex, preferenceIndex) => {
    const updatedStudentPreferences = [...studentPreferences];
    updatedStudentPreferences[studentIndex][preferenceIndex] = e.target.value;
    setStudentPreferences(updatedStudentPreferences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student preferences:", studentPreferences);
    console.log("Is Disabled:", isDisabled);
    console.log("Gender:", gender);
    // Additional logic to handle form submission
  };

  return (
    <CriteriaStyle>
      <Header />

      <Form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Fill The Form</h2>
        <FormGroup className="mb-3">
          <Label>Is Disabled:</Label>
          <Select
            className="form-select"
            value={isDisabled}
            onChange={(e) => setIsDisabled(e.target.value)}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Select>
        </FormGroup>

        <FormGroup className="mb-3">
          <Label>Gender:</Label>
          <Select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </FormGroup>

        {studentPreferences.map((student, studentIndex) => (
          <div key={studentIndex}>
            <h3 className="mb-3">Student {studentIndex + 1}</h3>
            {companies.map((company, preferenceIndex) => (
              <FormGroup key={company.company_id} className="mb-3">
                <Label>{`Preference ${preferenceIndex + 1} for ${
                  company.company_name
                }:`}</Label>
                <Select
                  className="form-select"
                  value={studentPreferences[studentIndex][preferenceIndex]}
                  onChange={(e) =>
                    handlePreferenceChange(e, studentIndex, preferenceIndex)
                  }
                  required
                >
                  <option value="">Select</option>
                  {companies.map((company) => (
                    <option key={company.company_id} value={company.company_id}>
                      {company.company_name}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            ))}
          </div>
        ))}

        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </CriteriaStyle>
  );
};

export default StudentPlacementForm;
