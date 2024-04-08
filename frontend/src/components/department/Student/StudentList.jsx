import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import studentService from "../../../services/student.service";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import EditStudent from "./EditStudent";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { isLogged, userId } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletedStudentId, setDeletedStudentId] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getStudentsByDepartment(userId);

      if (response.ok) {
        const responseData = await response.json();

        const studentsData = responseData.data.map((student, index) => ({
          ...student,
          id: index + 1,
        }));

        setStudents(studentsData);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [userId]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDelete = (studentId) => {
    setDeletedStudentId(studentId);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = async (studentId) => {
    try {
      const response = await studentService.deleteStudent(deletedStudentId);
      if (response.ok) {
        // Remove deleted student from the list
        setStudents(students.filter((student) => student.id !== studentId));
        toast.success("Student deleted successfully.", { autoClose: 1000 });
      } else {
        console.error("Failed to delete student:", response.statusText);
        toast.error("Failed to delete student.");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Error deleting student.");
    }
    setShowConfirmation(false);
  };

  const filteredStudents = searchText
    ? students.filter((student) =>
        student.first_name.toLowerCase().includes(searchText.toLowerCase())
      )
    : students;

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "first_name", headerName: "First Name", width: 110 },
    { field: "last_name", headerName: "Last Name", width: 110 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "contact_email", headerName: "Contact Email", width: 190 },
    { field: "department_id", headerName: "Department", width: 135 },
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

  const handleEdit = (studentId) => {
    setEditingStudentId(studentId);
  };

  return (
    <>
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this company?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <TableContainer>
        <SearchInput
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder="Search ..."
        />
        <CustomDataGrid
          rows={filteredStudents}
          columns={columns}
          autoHeight
          pageSize={5}
        />
        {editingStudentId && (
          <EditStudent
            studentId={editingStudentId}
            initialData={students.find((stud) => stud.id === editingStudentId)}
            onCancel={() => setEditingStudentId(null)}
          />
        )}
      </TableContainer>
    </>
  );
};

export default StudentList;
