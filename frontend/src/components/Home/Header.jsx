import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom"; // Import NavLink
import DarkModeToggle from "../../ui/DarkModeToggle";
import Heading from "../../ui/Heading";

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

// Styled NavLink
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 0 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledButton = styled(NavLink)`
  background-color: #08b3c1;
  border-radius: 20px;
  color: #ffffff;
  padding: 3px 10px;

  &:hover {
    background-color: #087aa4;
    border-radius: 20px;
    color: #ffffff;
  }
`;

// Header component
const Header = () => {
  return (
    <HeaderContainer>
      <NavLink to="/">
        <LeftContainer>
          <Logo src="/logo-light.png" alt="IPS" />
          <Heading as="h5">Internship placement system</Heading>
        </LeftContainer>
      </NavLink>
      <RightContainer>
        <DarkModeToggle />
        <StyledNavLink to="/Frequently-Asked-Questions">FAQ</StyledNavLink>
        <StyledButton>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </StyledButton>
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
