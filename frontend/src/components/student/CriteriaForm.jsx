import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "../../styles/GlobalStyles";
import Header from "./Header";

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 80px auto;
  padding: 2rem;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.6rem;
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.6rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CompanyCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const companies = [
  "Company 1",
  "Company 2",
  "Company 3",
  "Company 4",
  "Company 5",
  // Add more companies as needed
];

const preferenceOptions = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const StudentPlacementForm = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [preference, setPreference] = useState("medium");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCompanies([...selectedCompanies, value]);
    } else {
      setSelectedCompanies(
        selectedCompanies.filter((company) => company !== value)
      );
    }
  };

  const handlePreferenceChange = (e) => {
    setPreference(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <Header />
      <FormContainer>
        <GlobalStyles />
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Fill The Form
        </h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Name:</Label>
            <Input type="text" id="name" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="gender">Gender:</Label>
            <Select id="gender" required>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="preference">Preference:</Label>
            <Select
              id="preference"
              value={preference}
              onChange={handlePreferenceChange}
              required
            >
              {preferenceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Choose Companies:</Label>
            <CompanyCheckboxGroup>
              {companies.map((company) => (
                <CompanyCheckboxLabel key={company}>
                  <Checkbox
                    type="checkbox"
                    value={company}
                    onChange={handleCheckboxChange}
                  />
                  {company}
                </CompanyCheckboxLabel>
              ))}
            </CompanyCheckboxGroup>
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default StudentPlacementForm;
