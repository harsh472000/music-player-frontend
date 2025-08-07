import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { loginService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const result = await loginService(values);
        if (result) {
          navigate("/dashboard");
        }
      } catch (error) {
        setErrors({ submit: "Login failed. Please check your credentials and try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 4,
          p: 4,
          textAlign: "center",
        }}
      >
        {/* Music Logo with Icon and Name */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={3}>
          <MusicNoteIcon 
            sx={{ 
              fontSize: 40,
              color: theme.palette.primary.main 
            }} 
          />
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              background: theme.palette.mode === "dark"
                ? "linear-gradient(45deg, #64b5f6, #1976d2)"
                : "linear-gradient(45deg, #1976d2, #0d47a1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Music App
          </Typography>
        </Stack>

        <Typography variant="h5" fontWeight="bold" mb={3}>
          Welcome Back
        </Typography>
        
        <Typography variant="body2" color="text.secondary" mb={4}>
          Sign in to continue to your account
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            sx={{ mb: 3 }}
            placeholder="Enter your email"
          />
          
          <CustomInput
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            sx={{ mb: 3 }}
            placeholder="Enter your password"
          />
          
          {(formik.errors.submit) && (
            <Typography 
              color="error" 
              variant="body2" 
              sx={{ 
                mb: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1
              }}
            >
              {formik.errors.submit}
            </Typography>
          )}
          
          <CustomButton
            type="submit"
            fullWidth
            title={formik.isSubmitting ? "Logging in..." : "Login"}
            variant="primary"
            state="Filled"
            disabled={formik.isSubmitting || !formik.isValid}
            sx={{ 
              mt: 2,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2
            }}
          />
        </form>

        <Typography variant="body2" mt={3} color="text.secondary">
          Don't have an account?{" "}
          <Typography 
            component="span" 
            color="primary.main" 
            sx={{ 
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;