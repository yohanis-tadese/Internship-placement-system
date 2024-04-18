import Header from "../../components/Home/Header";
import styled from "styled-components";
import LoginForm from "../../components/Login/LoginForm";
import Heading from "../../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  border-bottom: 7px solid #cf711f;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Header />
      <hr />
      <hr />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
