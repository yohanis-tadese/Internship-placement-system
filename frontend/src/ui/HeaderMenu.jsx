import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { LuLogOut } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../context/AuthContext";

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
  const { isLogged, isDepartment } = useAuth();

  const handleLogout = () => {
    // Clear user token from local storage
    localStorage.removeItem("user_token");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <StyledHeaderMenu>
      {isLogged && (
        <>
          <WelcomeMessage>Welcome</WelcomeMessage>
          <ButtonIcon>
            <FaRegUser />
          </ButtonIcon>
        </>
      )}
      <DarkModeToggle />

      <ButtonIcon onClick={handleLogout}>
        <LuLogOut />
      </ButtonIcon>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
