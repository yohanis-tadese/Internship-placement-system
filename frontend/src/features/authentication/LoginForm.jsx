import React, { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useNavigate } from "react-router-dom";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import loginService from "../../services/login.service";

const LoginFormContainer = styled.form`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
`;

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = {
        username,
        password,
      };
      const response = await loginService.logIn(formData);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user_token", data.user_token);
        const userType = data.user_role;
        navigate(`/${userType.toLowerCase()}/dashboard`); // Redirect based on user type
      } else {
        setServerError(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setServerError("An error occurred. Please try again later.");
    }
  }

  return (
    <LoginFormContainer>
      <Form onSubmit={handleSubmit}>
        <Heading as="h6">Log in to your account</Heading>
        <FormRowVertical label="Username">
          <Input
            type="text"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        {serverError && (
          <div className="validation-error" role="alert">
            {serverError}
          </div>
        )}
        <FormRowVertical>
          <Button type="submit" size="large">
            Log in
          </Button>
        </FormRowVertical>
      </Form>
    </LoginFormContainer>
  );
}

export default LoginForm;
