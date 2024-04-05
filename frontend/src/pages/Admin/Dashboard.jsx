import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdBusiness, MdSchool } from "react-icons/md"; // Import organization and department icons
import { FaUserGraduate } from "react-icons/fa"; // Import student icon
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

import departmentService from "../../services/department.service"; // Correct import
import companyService from "../../services/company.service"; // Correct import
import studentService from "../../services/student.service"; // Correct import

// Styled component for the dashboard container
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

// Styled component for the individual box
const Box = styled.div`
  position: relative;
  padding: 20px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  color: white;

  &:hover {
    transform: translateY(-1px);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: var(--color-grey-600);
  }

  h3 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: var(--color-grey-600);
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const StyledLink = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #0984e3;
  text-decoration: none;
  font-weight: bold;
`;

function Dashboard() {
  const [numDepartments, setNumDepartments] = useState(0);
  const [numCompanies, setNumCompanies] = useState(0);
  const [numStudents, setnumStudents] = useState(0);

  useEffect(() => {
    // Fetch real data for the dashboard
    async function fetchData() {
      try {
        const departmentResponse = await departmentService.getAllDepartments();
        const companyResponse = await companyService.getAllCompanies();
        const studentRespons = await studentService.getAllStudents();

        if (departmentResponse.ok && companyResponse.ok && studentRespons.ok) {
          const departmentData = await departmentResponse.json();
          const department = departmentData.department;

          const companyData = await companyResponse.json();
          const companies = companyData.companies;

          const studentData = await studentRespons.json();
          const students = studentData.students;

          setNumDepartments(department.length);
          setNumCompanies(companies.length);
          setnumStudents(students.length);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Admin Dashboard</Heading>
      </Row>
      <br /> <br />
      <DashboardContainer>
        <Box>
          <Heading as="h2">Number of Departments</Heading>
          <h3>{numDepartments}</h3>
          <IconContainer>
            <MdSchool size={24} color="#00b894" />
          </IconContainer>
          <StyledLink to="/admin/department">See detail</StyledLink>
        </Box>
        <Box>
          <Heading as="h2">Number of Companies</Heading>
          <h3>{numCompanies}</h3>
          <IconContainer>
            <MdBusiness size={24} color="#0984e3" />
          </IconContainer>
          <StyledLink to="/admin/company">See detail</StyledLink>
        </Box>
        <Box>
          <Heading as="h2">Number of Students</Heading>
          <h3>{numStudents}</h3>
          <IconContainer>
            <FaUserGraduate size={24} color="#0984e3" />
          </IconContainer>
          <StyledLink>Number of students</StyledLink>
        </Box>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;
