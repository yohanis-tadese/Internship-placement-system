import React, { useState, useEffect, useContext } from "react";
import getAuth from "../utils/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDepartment, setIsDepartment] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [usernameValue, setusernameValue] = useState("");

  const value = {
    isLogged,
    userRole,
    userId,
    username,
    isAdmin,
    isDepartment,
    isStudent,
    isCompany,
    usernameValue,
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const response = await getAuth();
      console.log(response);
      if (response) {
        setIsLogged(true);
        setUserRole(response.role);
        setUserId(response.userId);
        setUsername(response.username);
        setIsAdmin(response.role === "Admin");
        setIsDepartment(response.role === "Department");
        setIsStudent(response.role === "Student");
        setIsCompany(response.role === "Company");
        const usernameParts = response.username.split("_");
        const second = usernameParts.length > 1 ? usernameParts[1] : "";
        setusernameValue(second);
      }
    };

    fetchLoggedInUser();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
