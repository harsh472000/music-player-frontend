import { Box, styled, Typography } from "@mui/material";

export const MLayoutContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  height: "100%",
  display: "flex",
}));

export const StyledRightBoxWrapper = styled(Box)(({ theme }) => ({
  background: "#F1F2F4",
  height: "100%",
  position: "relative",
  display: "flex",
}));
