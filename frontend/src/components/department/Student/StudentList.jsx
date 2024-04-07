import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import studentService from "../../../services/student.service";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
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

const StudentList = () => {
  const { isLogged, departmentType } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await studentService.getStudentsByDepartment(
        departmentType
      );

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
  }, [departmentType]);

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
    { field: "first_name", headerName: "First Name", width: 110 },
    { field: "last_name", headerName: "Last Name", width: 110 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "contact_email", headerName: "Contact Email", width: 190 },
    { field: "department_type", headerName: "Department", width: 135 },
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
    <TableContainer>
      <SearchInput
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search by first name..."
      />
      <CustomDataGrid
        rows={students}
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
  );
};

export default StudentList;
