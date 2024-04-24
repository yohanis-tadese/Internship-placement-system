import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../../../ui/DarkModeToggle";
import { FaSignOutAlt, FaBuilding, FaListAlt } from "react-icons/fa";
import Heading from "../../../ui/Heading";
import { useAuth } from "../../../context/AuthContext";
import loginService from "../../../services/login.service";
import studentService from "../../../services/student.service";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--color-grey-0);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Logo = styled.img`
  width: 100px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-silver-600);
  @media screen and (max-width: 850px) {
    display: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-silver-600);
  gap: 1.3rem;
  margin-right: 20px;
  @media screen and (max-width: 768px) {
    margin-top: 0;
    font-size: 10px;
    margin-left: auto;
  }
  @media screen and (max-width: 570px) {
    font-size: 7px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 2px 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: var(--color-black);

  &:hover {
    background-color: var(--color-grey-300);
  }

  &.active {
    background-color: var(--color-grey-300);
  }
`;

const StyledButton = styled.button`
  background-color: #7dc400;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #7dc400;
    border-radius: 20px;
    color: #ffffff;
  }
`;

// Header component
const Header = () => {
  const navigate = useNavigate();
  const { isLogged, secondName, setIsLogged, userId } = useAuth();
  const [hasFilledForm, setHasFilledForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studentService.getApplyStudentById(userId);

        if (
          response.applyStudents[0].student_id !== undefined &&
          response.applyStudents[0].student_id !== null
        ) {
          setHasFilledForm(true);
        } else {
          console.error("Failed to fetch student data:", response);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (isLogged) {
      fetchData();
    }
  }, [userId, isLogged]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "logoutEvent") {
        logOut();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logOut = () => {
    // Call the logout function from the login service
    loginService.logOut();
    // Set the isLogged state to false
    setIsLogged(false);

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <NavLink to="/student/dashboard">
        <LeftContainer>
          <Logo src="/logo-light.png" alt="IPS" />
          {isLogged && (
            <Heading as="h2" style={{ textTransform: "capitalize" }}>
              <div>Welcome {secondName ? secondName : "User"}</div>
            </Heading>
          )}
        </LeftContainer>
      </NavLink>
      {isLogged && (
        <RightContainer>
          <StyledNavLink to="/student/company">
            <FaBuilding /> Company
          </StyledNavLink>

          <StyledNavLink
            to={
              hasFilledForm === true ? "/student/form/update" : "/student/apply"
            }
          >
            <FaListAlt /> Apply
          </StyledNavLink>
          <StyledNavLink to="/student/result">
            <FaBuilding /> result
          </StyledNavLink>

          <DarkModeToggle />
          <StyledButton onClick={logOut}>
            <FaSignOutAlt /> Logout
          </StyledButton>
        </RightContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
