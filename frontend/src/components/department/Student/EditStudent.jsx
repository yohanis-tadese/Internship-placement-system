// import React, { useState, useEffect } from "react";
// import Button from "../../../ui/Button";
// import Form from "../../../ui/Form";
// import FormRow from "../../../ui/FormRow";
// import Input from "../../../ui/Input";
// import Modal from "../../../ui/Modal";
// import CancelButton from "../../../ui/CancelButton";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { StudentForm } from "../../FormField";
// import studentService from "../../../services/student.service";

// const EditStudent = ({ studentId, initialData, onCancel }) => {
//   const [formData, setFormData] = useState({});
//   const [modalVisible, setModalVisible] = useState(true);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     } else {
//       fetchStudentData();
//     }
//   }, [initialData, studentId]);

//   const fetchStudentData = async () => {
//     try {
//       const response = await studentService.getStudent(studentId);
//       if (response.ok) {
//         const responseData = await response.json();
//         setFormData(responseData.student);
//       } else {
//         console.error("Failed to fetch student:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching student:", error);
//     }
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     onCancel(); // Call onCancel function provided by parent
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate first name
//     if (!formData.first_name) {
//       newErrors.first_name = "First name is required";
//     }

//     // Validate last name
//     if (!formData.last_name) {
//       newErrors.last_name = "Last name is required";
//     }

//     // Validate phone number
//     if (!formData.phone_number) {
//       newErrors.phone_number = "Phone number is required";
//     }

//     // Validate contact email
//     if (!formData.contact_email) {
//       newErrors.contact_email = "Contact email is required";
//     } else if (!isValidEmail(formData.contact_email)) {
//       newErrors.contact_email = "Invalid email format";
//     }

//     setErrors(newErrors);

//     // If there are no errors, return true
//     return Object.keys(newErrors).length === 0;
//   };

//   const isValidEmail = (email) => {
//     // Email validation logic
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await studentService.updateStudent(studentId, formData);

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//       }

//       const responseData = await response.json();

//       console.log("Response data:", responseData); // Log the response data

//       if (response.status === 200) {
//         setErrors({});
//         toast.success(responseData.message, { autoClose: 2000 });
//       }

//       setModalVisible(false);
//     } catch (error) {
//       console.error("Error updating student:", error); // Log the error
//       toast.error("Error updating student.", { autoClose: 2000 });
//     }
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//   };

//   return (
//     <div>
//       {modalVisible && (
//         <Modal onClick={handleCloseModal}>
//           <Form onSubmit={handleSubmit}>
//             {StudentForm.map((field) => (
//               <FormRow
//                 key={field.id}
//                 label={field.label}
//                 error={errors[field.id]}
//               >
//                 <Input
//                   type={field.type}
//                   id={field.id}
//                   autoComplete={field.autoComplete}
//                   value={formData[field.id] || ""}
//                   onChange={handleChange}
//                 />
//               </FormRow>
//             ))}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 gap: "3rem",
//                 marginTop: "2rem",
//               }}
//             >
//               <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
//               <Button type="submit">Update Student</Button>
//             </div>
//           </Form>
//         </Modal>
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EditStudent;

import React, { useState, useEffect } from "react";
import Button from "../../../ui/Button";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import CancelButton from "../../../ui/CancelButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StudentForm } from "../../FormField"; // Importing StudentForm from the correct path
import studentService from "../../../services/student.service";

const EditStudent = ({ studentId, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [modalVisible, setModalVisible] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) {
      fetchStudentData();
    }
  }, [initialData, studentId]);

  const fetchStudentData = async () => {
    try {
      const response = await studentService.getStudent(studentId);
      if (response.ok) {
        const responseData = await response.json();
        setFormData(responseData.students);
      } else {
        console.error("Failed to fetch student:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onCancel(); // Call onCancel function provided by parent
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate each field in the formData
    StudentForm.forEach((field) => {
      if (!formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      } else if (field.type === "email" && !isValidEmail(formData[field.id])) {
        newErrors[field.id] = `Invalid ${field.label} format`;
      }
    });

    setErrors(newErrors);

    // If there are no errors, return true
    return Object.keys(newErrors).length === 0;
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
      const response = await studentService.updateStudent(studentId, formData);

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const responseData = await response.json();

      console.log("Response data:", responseData);

      if (response.status === 200) {
        setErrors({});
        toast.success(responseData.message, { autoClose: 2000 });
      }

      setModalVisible(false);
    } catch (error) {
      console.error("Error updating student:", error); // Log the error
      toast.error("Error updating student.", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div>
      {modalVisible && (
        <Modal onClick={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            {StudentForm.map((field) => (
              <FormRow
                key={field.id}
                label={field.label}
                error={errors[field.id]}
              >
                <Input
                  type={field.type}
                  id={field.id}
                  autoComplete={field.autoComplete}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                />
              </FormRow>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "3rem",
                marginTop: "2rem",
              }}
            >
              <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
              <Button type="submit">Update Student</Button>
            </div>
          </Form>
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditStudent;
