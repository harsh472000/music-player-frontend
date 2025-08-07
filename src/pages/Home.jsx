import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cookieStorage } from "../utils/cookie";

import Loader from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for a JWT token
    const jwtToken = cookieStorage.getItem("jwt_token");
    if (jwtToken) {
      // If logged in, redirect to the dashboard
      navigate("/dashboard");
      return;
    }
    navigate("/login");
  }, []);

  return <Loader loading={true} />;
};

export default Home;
