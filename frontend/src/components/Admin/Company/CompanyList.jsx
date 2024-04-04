import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import companyService from "../../../services/company.service";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

import styled from "styled-components";

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

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      console.log("response", response);

      if (response.ok) {
        const responseData = await response.json();
        const companiesData = responseData.companies.map((company, index) => ({
          ...company,
          id: index + 1,
        }));
        setCompanies(companiesData);
      } else {
        console.error("Failed to fetch companies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    // Fetch companies initially
    fetchCompanies();

    // Set up interval to fetch companies every 10 seconds
    const intervalId = setInterval(fetchCompanies, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredCompanies = searchText
    ? companies.filter((company) =>
        company.company_name.toLowerCase().includes(searchText.toLowerCase())
      )
    : companies;

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "company_name", headerName: "Name", width: 90 },
    { field: "phone_number", headerName: "Phone Number", width: 130 },
    { field: "contact_email", headerName: "Contact Email", width: 170 },
    { field: "location", headerName: "Location", width: 100 },
    { field: "industry_sector", headerName: "Industry Sector", width: 130 },
    {
      field: "accepted_student_limit",
      headerName: "Accepted Limit",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 125,
      renderCell: (params) => (
        <ActionsWrapper>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.company_id)}
          >
            <DeleteIcon />
          </IconButton>
        </ActionsWrapper>
      ),
    },
  ];

  const handleDelete = async (companyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (confirmed) {
      try {
        const response = await companyService.deleteCompany(companyId);
        if (response.ok) {
          // Remove deleted company from the list
          setCompanies(companies.filter((company) => company.id !== companyId));
        } else {
          console.error("Failed to delete company:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    }
  };

  return (
    <TableContainer>
      <SearchInput
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search by name..."
      />
      <CustomDataGrid
        rows={filteredCompanies}
        columns={columns}
        autoHeight
        pagination={true}
      />
    </TableContainer>
  );
};

export default CompanyList;
