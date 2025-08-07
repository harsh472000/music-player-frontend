import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { Box, Typography, useTheme, Stack } from "@mui/material";
import { registerService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const result = await registerService(values);
        if (result) {
          navigate("/login", { state: { registrationSuccess: true } });
        }
      } catch (error) {
        setErrors({ submit: error.message || "Registration failed. Please try again." });
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
          maxWidth: 500,
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

        <Typography variant="h5" fontWeight="bold" mb={1}>
          Create Your Account
        </Typography>
        
        <Typography variant="body2" color="text.secondary" mb={4}>
          Join our music community today
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" gap={2} mb={3}>
            <CustomInput
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              placeholder="John"
              fullWidth
            />
            <CustomInput
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              placeholder="Doe"
              fullWidth
            />
          </Box>
          
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
            placeholder="your@email.com"
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
            sx={{ mb: 2 }}
            placeholder="Create a password"
          />
          
          {(formik.errors.submit) && (
            <Typography 
              color="error" 
              variant="body2" 
              sx={{ 
                mb: 2,
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
            title={formik.isSubmitting ? "Creating account..." : "Register"}
            variant="primary"
            state="Filled"
            disabled={formik.isSubmitting || !formik.isValid}
            sx={{ 
              mt: 4,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: 2
            }}
          />
        </form>

        <Typography variant="body2" mt={3} color="text.secondary">
          Already have an account?{" "}
          <Typography 
            component="span" 
            color="primary.main" 
            sx={{ 
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
            onClick={() => navigate("/login")}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;