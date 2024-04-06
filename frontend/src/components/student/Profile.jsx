import React from "react";
import Profile from "./Profile";

const StudentProfilePage = () => {
  const studentName = "John Doe"; // Replace with the actual student's name
  return (
    <div>
      <h1>Student Profile</h1>
      <Profile studentName={studentName} />
    </div>
  );
};

export default StudentProfilePage;
