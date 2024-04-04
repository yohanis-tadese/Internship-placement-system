import React, { useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import CancelButton from "../../../ui/CancelButton";
import Modal from "../../../ui/Modal";
import studentService from "../../../services/student.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    contact_email: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate first name
    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
      valid = false;
    }

    // Validate last name
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
      valid = false;
    }

    // Validate phone number
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
      valid = false;
    }

    // Validate contact email
    if (!formData.contact_email) {
      newErrors.contact_email = "Contact email is required";
      valid = false;
    } else if (!isValidEmail(formData.contact_email)) {
      newErrors.contact_email = "Invalid email format";
      valid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email) => {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Send post request to create student
      const response = await studentService.createStudent(formData);

      if (response.status === 400) {
        // If error occurs
        const responseData = await response.json();
        toast.error(responseData.error, { autoClose: 2000 });
        return;
      }

      if (!response.ok) {
        toast.error("Failed to create student", { autoClose: 2000 });
        return;
      }

      const responseData = await response.json();
      if (response.status === 200) {
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
          contact_email: "",
          password: "",
        });
        setErrors({});
        toast.success(responseData.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      toast.error(
        "Error creating student:",
        {
          autoClose: 2000,
        },
        error.message
      );
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setErrors({});
  };

  return (
    <div>
      <Button size="medium" onClick={() => setModalVisible(true)}>
        Add New
      </Button>

      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <FormRow label="First Name" error={errors.first_name}>
              <Input
                type="text"
                id="first_name"
                autoComplete="on"
                value={formData.first_name}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Last Name" error={errors.last_name}>
              <Input
                type="text"
                id="last_name"
                autoComplete="on"
                value={formData.last_name}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Phone Number" error={errors.phone_number}>
              <Input
                type="text"
                id="phone_number"
                autoComplete="on"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Contact Email" error={errors.contact_email}>
              <Input
                type="text"
                id="contact_email"
                autoComplete="on"
                value={formData.contact_email}
                onChange={handleChange}
              />
            </FormRow>
            <FormRow label="Password" error={errors.password}>
              <Input
                type="password"
                id="password"
                autoComplete="on"
                value={formData.password}
                onChange={handleChange}
              />
            </FormRow>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "3rem",
                marginTop: "2rem",
              }}
            >
              <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
              <Button>Create Student</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default CreateStudent;
