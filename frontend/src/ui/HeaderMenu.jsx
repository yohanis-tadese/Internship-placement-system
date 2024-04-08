import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { LuLogOut } from "react-icons/lu";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../context/AuthContext";
import loginService from "../services/login.service";

const StyledHeaderMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
`;

const WelcomeMessage = styled.span`
  font-weight: bold;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isLogged, setIsLogged, userRole } = useAuth();

  const getWelcomeMessage = () => {
    switch (userRole) {
      case "Admin":
        return "Welcome Admin!";
      case "Company":
        return "Welcome Company!";
      case "Student":
        return "Welcome Student!";
      case "Department":
        return "Welcome Department!";
      default:
        return "Welcome!";
    }
  };

  const logOut = () => {
    // Call the logout function from the login service
    loginService.logOut();
    // Set the isLogged state to false
    setIsLogged(false);

    // Navigate to the login page
    navigate("/login");

    // Reload the page after logout
  };

  return (
    <StyledHeaderMenu>
      <>
        <WelcomeMessage>{getWelcomeMessage()}</WelcomeMessage>
        <ButtonIcon>
          <PiUserCircleDuotone />
        </ButtonIcon>
      </>

      <DarkModeToggle />

      <ButtonIcon onClick={logOut}>
        <LuLogOut />
      </ButtonIcon>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
