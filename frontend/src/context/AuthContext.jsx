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
  const [secondName, setSecondName] = useState(""); // State to store the second name
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDepartment, setIsDepartment] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const value = {
    isLogged,
    userRole,
    userId,
    username,
    secondName,
    isAdmin,
    isDepartment,
    isStudent,
    isCompany,
    setIsLogged,
  };

  console.log(value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuth();
        if (response.token) {
          setIsLogged(true);
          setUserRole(response.role);
          setUserId(response.userId);
          setUsername(response.username);
          setIsAdmin(response.role === "Admin");
          setIsDepartment(response.role === "Department");
          setIsStudent(response.role === "Student");
          setIsCompany(response.role === "Company");

          // Extract the second name from the username and set it in state
          const secondName = response.username.split(".")[1];
          setSecondName(secondName);
        }
      } catch (error) {
        console.error("Error fetching authentication:", error);
      }
    };

    fetchData();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
