import styled from "styled-components";
import LoginForm from "../components/LoginForm";
// import Heading from "../ui/Heading";
import Header from "../components/Home/Header";
// import Footer from "../components/Home/Footer";

const LoginLayout = styled.main`
  min-height: 100vh;
  border-bottom: 7px solid #cf711f;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <StyledAppLayout>
      <Header />
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
      {/* <Footer /> */}
    </StyledAppLayout>
  );
}

export default Login;
