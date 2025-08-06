import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { cookieStorage } from "../../utils/cookie"; 

const AuthGuard = ({ children }) => {
  const location = useLocation(); 
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = cookieStorage.getItem("jwt_token");
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
