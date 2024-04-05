import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import studentService from "../../../services/student.service";
import {
  FaEdit,
  FaRegTrashAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditStudent from "./EditStudent";

const TableContainer = styled.div`
  width: 100%;
  height: 400px;
  font-size: 1.6rem;
`;

const SearchInput = styled.input`
  width: 15%;
  margin-bottom: 10px;
  margin-left: 1px;
  padding: 7px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1.4rem;
  color: var(--color-grey-900);
`;

const CustomDataGrid = styled(DataGrid)`
  & .MuiDataGrid-root {
    border-radius: 5px;
    border: 1px solid #ccc;
    overflow: hidden;
  }

  & .MuiDataGrid-columnsContainer {
    background-color: var(--color-grey-300);
    border-bottom: 1px solid #ccc;
    font-weight: bold;
  }

  & .MuiDataGrid-columnHeader {
    border-right: 1px solid #ccc;
    background-color: var(--color-grey-100);
    color: var(--color-grey-900);
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
  }

  & .MuiDataGrid-row {
    transition: background-color 0.2s;
    border-bottom: 1px solid #ccc;
    color: var(--color-grey-900);
    height: 50px;
    font-size: 13px;
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const EditIcon = styled(FaEdit)`
  color: #007bff;
  font-size: 18px;
`;

const DeleteIcon = styled(FaRegTrashAlt)`
  color: #dc3545;
  font-size: 18px;
`;

const ConfirmationContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 460px;
  background-color: #ff9966;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 400px;
`;

const ConfirmationMessage = styled.p`
  font-size: 16px;
  color: #333333;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
`;

const ConfirmButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  background-color: #e0e0e0;
  color: #333333;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #bdbdbd;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
`;

const ConfirmIcon = styled(FaCheckCircle)`
  color: #28a745;
`;

const CancelIcon = styled(FaTimesCircle)`
  color: #dc3545;
`;

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <ConfirmationContainer>
      <ConfirmationMessage>{message}</ConfirmationMessage>
      <ButtonWrapper>
        <ConfirmButton onClick={onConfirm}>
          <IconWrapper>
            <ConfirmIcon />
          </IconWrapper>
          Confirm
        </ConfirmButton>
        <CancelButton onClick={onCancel}>
          <IconWrapper>
            <CancelIcon />
          </IconWrapper>
          Cancel
        </CancelButton>
      </ButtonWrapper>
    </ConfirmationContainer>
  );
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedStudentId, setDeletedStudentId] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getAllStudents();
      if (response.ok) {
        const responseData = await response.json();
        const studentsData = responseData.students.map((student, index) => ({
          ...student,
          id: index + 1,
        }));
        // Prepend newly fetched students to the existing list
        setStudents(studentsData);
      } else {
        console.error("Failed to fetch students:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    // Fetch students initially
    fetchStudents();

    // Set up interval to fetch students every 10 seconds
    const intervalId = setInterval(fetchStudents, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredStudents = searchText
    ? students.filter((student) =>
        student.first_name.toLowerCase().includes(searchText.toLowerCase())
      )
    : students;

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "phone_number", headerName: "Phone Number", width: 190 },
    { field: "contact_email", headerName: "Contact Email", width: 205 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <ActionsWrapper>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row.student_id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.student_id)}
          >
            <DeleteIcon />
          </IconButton>
        </ActionsWrapper>
      ),
    },
  ];

  const handleDelete = (studentId) => {
    setDeletedStudentId(studentId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async (studentId) => {
    try {
      const response = await studentService.deleteStudent(deletedStudentId);
      if (response.ok) {
        // Remove deleted student from the list
        setStudents(students.filter((students) => students.id !== studentId));
        toast.success("Student deleted successfully.", {
          autoClose: 1000,
        });
      } else {
        console.error("Failed to delete department:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleEdit = (studentId) => {
    setEditingStudentId(studentId);
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
  };

  return (
    <>
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this Student?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <TableContainer>
        <SearchInput
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search by first name..."
        />
        <CustomDataGrid
          rows={filteredStudents}
          columns={columns}
          autoHeight
          pagination={true}
          pageSize={5} // Display 5 students per page
          rowCount={filteredStudents.length} // Total number of rows
        />

        {editingStudentId && (
          <EditStudent
            studentId={editingStudentId}
            initialData={students.find((stud) => stud.id === editingStudentId)}
            onCancel={handleCancelEdit}
          />
        )}
      </TableContainer>
    </>
  );
};

export default StudentList;
