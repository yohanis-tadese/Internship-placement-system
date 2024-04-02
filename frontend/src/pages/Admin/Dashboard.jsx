import React from "react";
import styled from "styled-components";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

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
  background-color: var(--color-grey-500);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  color: white;

  &:hover {
    transform: translateY(-4px);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: color: var(--color-grey-600);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: color: var(--color-grey-600);
  }
  p {
    font-size: 1.2rem;
    color: color: var(--color-grey-600);
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

function Dashboard() {
  return (
    <DashboardContainer>
      <Box>
        <Heading as="h2">Number of Students</Heading>
        <h3>1000</h3>
        <IconContainer>
          <HiOutlineInformationCircle size={24} color="#666666" />
        </IconContainer>
      </Box>
      <Box>
        <Heading as="h2">Number of Students</Heading>
        <h3>1000</h3>
        <IconContainer>
          <HiOutlineInformationCircle size={24} color="#666666" />
        </IconContainer>
      </Box>
      <Box>
        <Heading as="h2">Number of Students</Heading>
        <h3>1000</h3>
        <IconContainer>
          <HiOutlineInformationCircle size={24} color="#666666" />
        </IconContainer>
      </Box>
      <Box>
        <Heading as="h2">Number of Companies</Heading>
        <h3>50</h3>
        <IconContainer>
          <HiOutlineInformationCircle size={24} color="#666666" />
        </IconContainer>
      </Box>
    </DashboardContainer>
  );
}

export default Dashboard;
