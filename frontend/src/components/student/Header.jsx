import React from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import DarkModeToggle from "../../ui/DarkModeToggle";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBuilding,
  FaListAlt,
} from "react-icons/fa";
import Heading from "../../ui/Heading";
import { useAuth } from "../../context/AuthContext";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--color-grey-100);
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const Logo = styled.img`
  width: 100px;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-silver-600);
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-silver-600);
  gap: 1rem;
  margin-right: 20px;
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
  background-color: #08b3c1;
  border: none;
  border-radius: 20px;
  color: #ffffff;
  padding: 5px 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #087aa4;
    border-radius: 20px;
    color: #ffffff;
  }
`;

// Header component
const Header = () => {
  const navigate = useNavigate();
  const { isLogged, secondName } = useAuth();

  const handleLogout = () => {
    // Clear user token from local storage
    localStorage.removeItem("user_token");

    navigate("/login");
  };

  return (
    <HeaderContainer>
      <NavLink to="/student/dashboard">
        <LeftContainer>
          <Logo src="/logo-light.png" alt="IPS" />
          {isLogged ? (
            <Heading as="h5" style={{ textTransform: "capitalize" }}>
              <div>Welcome {secondName ? secondName : "User"}!</div>
            </Heading>
          ) : (
            <Heading as="h5">Internship placement system</Heading>
          )}
        </LeftContainer>
      </NavLink>
      {isLogged && (
        <RightContainer>
          <StyledNavLink to="/student/company">
            <FaBuilding /> Company
          </StyledNavLink>
          <StyledNavLink to="/student/apply">
            <FaListAlt /> Apply
          </StyledNavLink>
          <StyledNavLink to="/student/result">
            <FaListAlt /> Result
          </StyledNavLink>
          <StyledNavLink to="/student/profile">
            <FaUserCircle /> Profile
          </StyledNavLink>
          <DarkModeToggle />
          <StyledButton onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </StyledButton>
        </RightContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
