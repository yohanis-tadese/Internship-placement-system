import React from "react";

const RoleSelect = ({ value, onChange }) => {
  const roles = ["Student", "Department", "Company", "Admin"];

  return (
    <select value={value} onChange={onChange}>
      {roles.map((role) => (
        <option key={role} value={role.toLowerCase()}>
          {role}
        </option>
      ))}
    </select>
  );
};

export default RoleSelect;
