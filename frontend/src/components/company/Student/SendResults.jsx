import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import resultService from "../../../services/result.service";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid var(--color-grey-300);
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 17px;
`;

const CancelButton = styled(Button)`
  background-color: red;
`;

const SendResults = ({ studentId, departmentId, companyId, onClose }) => {
  const [formData, setFormData] = useState({
    grade1: "",
    grade2: "",
    grade3: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resultService.saveResults({
        student_id: studentId,
        company_id: companyId,
        department_id: departmentId,
        ...formData,
      });
      console.log("Results saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving results:", error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Send full student results</h2>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <div>
            <Label htmlFor="message1">Grade 3</Label>
            <Input
              type="number"
              id="grade1"
              name="grade1"
              value={formData.grade1}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="message2">Grade 2</Label>
            <Input
              type="number"
              id="grade2"
              name="grade2"
              value={formData.grade2}
              onChange={handleChange}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <div>
            <Label htmlFor="email1">Grade 1</Label>
            <Input
              type="number"
              id="grade3"
              name="grade3"
              value={formData.grade3}
              onChange={handleChange}
            />
          </div>
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">Send</Button>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ButtonContainer>
      </Form>
    </Modal>
  );
};

export default SendResults;
