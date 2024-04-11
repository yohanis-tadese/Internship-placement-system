import React, { useState, useEffect } from "react";
import styled from "styled-components";
import studentService from "../../services/student.service";
import { useAuth } from "../../context/AuthContext";

// Styled components
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  text-transform: capitalize;
  background-color: #079992;
  width: 103.7%;
  border-radius: 3px;
  color: white;
  margin-top: -20px;
  padding: 7px;
  font-size: 25px;
`;

const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  width: 120px;
`;

const Value = styled.span`
  color: #333;
`;

const UserProfile = () => {
  const [student, setStudent] = useState(null);
  const { userId, secondName } = useAuth();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await studentService.getStudent(userId);

        if (response.ok) {
          const data = await response.json();
          const studentData = data.students;
          setStudent(studentData);
        } else {
          console.error("Failed to fetch student data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [userId]);

  return (
    <ProfileContainer>
      <ProfileHeader>
        Wellcome {secondName} to see detail about yourself.
      </ProfileHeader>
      {student && (
        <>
          <ProfileInfo>
            <Label>First Name:</Label>
            <Value>{student.first_name}</Value>
          </ProfileInfo>
          <ProfileInfo>
            <Label>Last Name:</Label>
            <Value>{student.last_name}</Value>
          </ProfileInfo>
          <ProfileInfo>
            <Label>Username:</Label>
            <Value>{student.username}</Value>
          </ProfileInfo>
          <ProfileInfo>
            <Label>Phone Number:</Label>
            <Value>{student.phone_number}</Value>
          </ProfileInfo>
          <ProfileInfo>
            <Label>Contact Email:</Label>
            <Value>{student.contact_email}</Value>
          </ProfileInfo>
          <ProfileInfo>
            <Label>GPA:</Label>
            <Value>{student.gpa}</Value>
          </ProfileInfo>
        </>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;
