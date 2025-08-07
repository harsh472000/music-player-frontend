import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { Box } from "@mui/material";


const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <Box sx={{ paddingTop: "64px" }}>
        <Outlet />
      </Box>      
    </div>
  );
};

export default DashboardLayout;
