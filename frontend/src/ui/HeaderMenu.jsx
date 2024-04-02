import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser, HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <ButtonIcon>
        <HiOutlineUser />
      </ButtonIcon>
      <DarkModeToggle />
      <ButtonIcon onClick={() => navigate("/login")}>
        <HiArrowRightOnRectangle />
      </ButtonIcon>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
