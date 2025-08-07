// import React, { useState } from "react";
// import { TextField, IconButton, InputAdornment } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

// const CustomInput = ({
//   label,
//   type = "text",
//   value,
//   onChange,
//   error = false,
//   helperText = "",
//   fullWidth = true,
//   variant = "outlined",
//   ...props
// }) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <TextField
//       label={label}
//       type={type === "password" && !showPassword ? "password" : "text"}
//       value={value}
//       onChange={onChange}
//       error={error}
//       helperText={helperText}
//       fullWidth={fullWidth}
//       variant={variant}
//       InputProps={{
//         endAdornment:
//           type === "password" ? (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//                 edge="end"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ) : null,
//       }}
//       {...props}
//     />
//   );
// };

// export default CustomInput;


import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  styled,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// 👇 Styled TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    paddingRight: theme.spacing(1),
    height: 40, // Reduced height
    borderRadius: theme.border?.sm || 8,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: "20px",
    letterSpacing: "-0.084px",
    display: "flex",
    alignItems: "center", // Center content vertically

    "& fieldset": {
      borderColor: theme.palette.blue?.lighter || "#ccc",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.blue?.base || "#375DFB",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.blue?.base || "#375DFB",
      boxShadow: "0px 0px 0px 2px #FFF, 0px 0px 0px 4px #EBF1FF",
    },
    "&.Mui-error fieldset": {
      borderColor: theme.palette.red?.base || "#FF0000",
    },
  },
  "& .MuiInputBase-input": {
    padding: "0px 12px", // Remove vertical padding, keep horizontal
    height: "100%", // Take full height of container
    display: "flex",
    alignItems: "center", // Center text vertically
  },
  "& .MuiInputLabel-root": {
    // Center the label/placeholder vertically
    top: "50%",
    left: "3%",
    transform: "translateY(-50%)",
    "&.MuiInputLabel-shrink": {
      top: 0,
      transform: "translateY(-50%) scale(0.75)",
    },
  },
  "& .MuiFormHelperText-root": {
    marginTop: theme.spacing(0.5),
    fontSize: "0.75rem",
  },
}));

const CustomInput = ({
  label,
  type = "text",
  value,
  onChange,
  error = false,
  helperText = "",
  fullWidth = true,
  variant = "outlined",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <StyledTextField
      label={label}
      type={type === "password" && !showPassword ? "password" : "text"}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      variant={variant}
      InputProps={{
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      {...props}
    />
  );
};

export default CustomInput;