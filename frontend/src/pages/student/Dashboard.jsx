import React from "react";
import Header from "../../components/student/Header";
import styled from "styled-components";

const StudentLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-0);
`;

const Dashboard = () => {
  return (
    <>
      <StudentLayout>
        <Header />
      </StudentLayout>
    </>
  );
};

export default Dashboard;
