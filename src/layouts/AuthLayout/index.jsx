import React from "react";

import { Box, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import RightIntro from "./RightIntro";
import { MLayoutContainer } from "./StyledComponent";

const MinimalLayout = () => {
  const theme = useTheme();

  return (
    <MLayoutContainer>
       <Box
        sx={{
          width: "45%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.down("md")]: { width: "100%" },
        }}
      >
        <Outlet />
      </Box>
      <Box sx={{ width: "55%", [theme.breakpoints.down("md")]: { display: "none" } }}>
        <RightIntro />
      </Box>
    </MLayoutContainer>
  );
};

export default MinimalLayout;
