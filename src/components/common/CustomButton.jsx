import React from "react";

import { Button, styled, useTheme } from "@mui/material";

const getVariantStyles = (variant, state, theme) => {
  switch (variant) {
    case "primary":
      switch (state) {
        case "Filled":
          return {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.blue.base,

            "&:hover": {
              backgroundColor: theme.palette.blue.dark,
            },

            "&:focus-within": {
              background: theme.palette.blue.base,
            },
          };
        case "Stroke":
          return {
            color: theme.palette.blue.base,
            border: `1px solid ${theme.palette.blue.base}`,
            backgroundColor: theme.palette.common.white,

            "&:hover": {
              backgroundColor: theme.palette.blue.lighter,
              border: `1px solid ${theme.palette.blue.lighter}`,
            },

            "&:focus-within": {
              border: `1px solid ${theme.palette.blue.base}`,
              backgroundColor: theme.palette.common.white,
              boxShadow: "0px 0px 0px 2px #FFF, 0px 0px 0px 4px #EBF1FF",
            },
          };
        case "Default":
          return {
            color: theme.palette.blue.base,
            border: `1px solid ${theme.palette.blue.lighter}`,

            "&:hover": {
              border: `1px solid ${theme.palette.blue.base}`,
              background: theme.palette.common.white,
              boxShadow: "0px 1px 2px 0px rgba(55, 93, 251, 0.08)",
            },

            "&:focus-within": {
              border: `1px solid ${theme.palette.blue.base}`,
              background: theme.palette.common.white,
              boxShadow: "0px 0px 0px 2px #FFF, 0px 0px 0px 4px #EBF1FF",
            },
          };
        default:
          return {};
      }
    case "error":
      switch (state) {
        case "Filled":
          return {
            color: theme.palette.common.white,
            border: `1px solid ${theme.palette.red.base}`,
            backgroundColor: theme.palette.red.base,

            "&:hover": {
              backgroundColor: theme.palette.red.dark,
            },
          };
        case "Stroke":
          return {
            color: theme.palette.red.base,
            border: `1px solid ${theme.palette.red.base}`,
            backgroundColor: "transparent",

            "&:hover": {
              backgroundColor: theme.palette.red.lighter,
              border: `1px solid ${theme.palette.background.paper}`,
            },
          };
        default:
          return {};
      }
    default:
      return {};
  }
};

const getSizeVariantStyles = (size, theme) => {
  switch (size) {
    case "medium":
      return {
        padding: theme.spacing(2.5),
        borderRadius: theme.border.md,
      };
    case "small":
      return {
        padding: theme.spacing(2),
        borderRadius: theme.border.sm,
      };
    case "default":
      return {};
  }
};

const StyledButton = styled(Button)(({ theme, variant, state, size }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  textAlign: "center",
  fontSize: theme.typography.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: "20px",
  letterSpacing: "-0.084px",
  minWidth: "unset",
  ...getVariantStyles(variant, state, theme),
  ...getSizeVariantStyles(size, theme),

  "&.Mui-disabled": {
    background: theme.palette.background.paper,
    color: theme.palette.text.disabled,
    border: `1px solid ${theme.palette.background.paper}`,
  },

  "& img": {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
  },
}));

const CustomButton = ({
  className,
  img,
  Icon,
  RightIcon,
  title,
  fullWidth = false,
  variant = "primary",
  state = "Filled",
  size = "medium",
  disabled = false,
  type = "button",
  ...props
}) => {
  const theme = useTheme();

  return (
    <StyledButton
      disableElevation
      size={size}
      fullWidth={fullWidth}
      variant={variant}
      state={state}
      disabled={disabled}
      className={className}
      type={type}
      {...props}
      disableTouchRipple
    >
      {img && <img src={img} alt={title} />}
      {Icon && <Icon size={theme.icon.size.lg} />}
      {title}
      {RightIcon && <RightIcon size={theme.icon.size.lg} />}
    </StyledButton>
  );
};

export default CustomButton;
