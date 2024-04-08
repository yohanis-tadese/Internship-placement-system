import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRowVertical from "../ui/FormRowVertical";
import Input from "../ui/Input";
import loginService from "../services/login.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be empty";
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginService.logIn(formData);
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem(
          "user_token",
          JSON.stringify(data.data.user_token)
        );

        const tokenData = JSON.parse(atob(data.data.user_token.split(".")[1]));
        const userRole = tokenData.user_role;

        let redirectTo = "";
        switch (userRole) {
          case "Admin":
            redirectTo = "/admin/dashboard";
            break;
          case "Company":
            redirectTo = "/company/dashboard";
            break;
          case "Student":
            redirectTo = "/student/dashboard";
            break;
          case "Department":
            redirectTo = "/department/dashboard";
            break;
          default:
            redirectTo = "/";
        }

        toast.success("User login successful!", { autoClose: 1000 });
        setTimeout(() => {
          if (navigate) {
            navigate(redirectTo);
            // Refresh the page after redirecting
            window.location.reload();
          }
        }, 10);
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Username" error={errors.username}>
          <Input
            type="text"
            id="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </FormRowVertical>
        <FormRowVertical label="Password" error={errors.password}>
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button type="submit" size="large">
            Log in
          </Button>
        </FormRowVertical>
      </Form>
      <ToastContainer />
    </>
  );
}

export default LoginForm;
