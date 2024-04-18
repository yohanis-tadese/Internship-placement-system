import { useState } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import adminService from "../../../services/admin.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelButton from "../../../ui/CancelButton";

function UpdateProfile() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    // Validation logic
    if (!formData.first_name) {
      errors.first_name = "First Name is required";
    }
    if (!formData.last_name) {
      errors.last_name = "Last Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }

    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      try {
        // Send a request to create a new admin
        const response = await adminService.createAdmin(formData);

        if (response.status === 400) {
          // If department name already exists
          const responseData = await response.json();
          toast.error(responseData.error, { autoClose: 1000 });
          return;
        }
        if (!response.ok) {
          toast.error("Failed to create admin", { autoClose: 1000 });
          return;
        }
        const responseData = await response.json();
        if (response.status === 200) {
          setFormData({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          });
          toast.success(responseData.message, { autoClose: 2000 });
        }
      } catch (error) {
        console.error("Error creating admin:", error);
        toast.error("Error creating admin", { autoClose: 2000 });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="First Name" error={errors?.first_name}>
        <Input
          type="text"
          id="first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Last Name" error={errors?.last_name}>
        <Input
          type="text"
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email}>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          value={formData.email}
          onChange={handleChange}
        />
      </FormRow>

      <FormRow>
        <CancelButton
          variant="secondary"
          type="reset"
          onClick={() =>
            setFormData({
              first_name: "",
              last_name: "",
              email: "",
            })
          }
        >
          Cancel
        </CancelButton>
        <Button type="submit">Update Profile</Button>
      </FormRow>
      <ToastContainer />
    </Form>
  );
}

export default UpdateProfile;
