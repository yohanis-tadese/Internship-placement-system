import { useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import FormRow from "../../../ui/FormRow";
import adminService from "../../../services/admin.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelButton from "../../../ui/CancelButton";
import Form from "./../../../ui/Form";
import { useAuth } from "../../../context/AuthContext";

function UpdatePassword() {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (formData.newPassword.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await adminService.changePassword(
        userId,
        formData.oldPassword,
        formData.newPassword
      );
      if (response.ok) {
        toast.success("Password updated successfully", { autoClose: 700 });
      } else {
        const data = await response.json();
        toast.error(data.message, { autoClose: 700 });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password", { autoClose: 700 });
    }
  };

  const handleCancel = () => {
    setFormData({
      oldPassword: "",
      newPassword: "",
    });
  };

  return (
    <>
      <Form onSubmit={handlePasswordChange}>
        <FormRow label="Old Password" error={errors?.password}>
          <Input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow label="New Password" error={errors?.password}>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </FormRow>

        <FormRow>
          <CancelButton
            variant="secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </CancelButton>
          <Button type="submit">Change Password</Button>
        </FormRow>
      </Form>
      <ToastContainer />
    </>
  );
}

export default UpdatePassword;
