import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <Loader loading={true} />;
};

export default Home;
