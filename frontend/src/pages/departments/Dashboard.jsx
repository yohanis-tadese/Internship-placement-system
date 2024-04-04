import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdBusiness } from "react-icons/md"; // Import organization icon
import { FaUserGraduate } from "react-icons/fa"; // Import student icon
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

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
  color: var(--color-grey-600);

  &:hover {
    transform: translateY(-1px);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  p {
    font-size: 1.2rem;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

function Dashboard() {
  const [numCompanies, setNumCompanies] = useState(0);
  const [numStudents, setNumStudents] = useState(0);

  useEffect(() => {
    // Fetch real data for the dashboard
    async function fetchData() {
      try {
        const companyResponse = await companyService.getAllCompanies();
        const studentResponse = await studentService.getAllStudents();

        if (companyResponse.ok && studentResponse.ok) {
          const companyData = await companyResponse.json();
          const studentData = await studentResponse.json();

          setNumCompanies(companyData.companies.length);
          setNumStudents(studentData.students.length);
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
        <Heading as="h1">Department Dashboard</Heading>
      </Row>
      <br /> <br />
      <DashboardContainer>
        <Box>
          <Heading as="h2">Number of Companies</Heading>
          <h3>{numCompanies}</h3>
          <IconContainer>
            <MdBusiness size={24} color="#0984e3" />{" "}
            {/* Use organization icon */}
          </IconContainer>
          <p>Number of companies registered in the system</p>
        </Box>
        <Box>
          <Heading as="h2">Number of Students</Heading>
          <h3>{numStudents}</h3>
          <IconContainer>
            <FaUserGraduate size={24} color="#0984e3" />{" "}
            {/* Use student icon */}
          </IconContainer>
          <p>Number of students registered in the system</p>
        </Box>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;
