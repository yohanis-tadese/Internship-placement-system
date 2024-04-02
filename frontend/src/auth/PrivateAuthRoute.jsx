import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import getAuth from "../utils/auth";

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedInEmployee = await getAuth();
        if (loggedInEmployee.employee_token) {
          setIsLogged(true);
          if (!roles || roles.includes(loggedInEmployee.employee_role)) {
            setIsAuthorized(true);
          }
        }
        setIsChecked(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsChecked(true);
      }
    };

    checkAuth();
  }, [roles]);

  if (!isChecked) {
    // Return a loading indicator if authentication status is being checked
    return <div>Loading...</div>;
  }

  if (!isLogged) {
    // Redirect to login page if user is not logged in
    return <Navigate to="/login" />;
  }

  if (!isAuthorized) {
    // Redirect to unauthorized page if user is not authorized
    return <Navigate to="/unauthorized" />;
  }

  // Render the children components if user is logged in and authorized
  return children;
};

export default PrivateAuthRoute;
