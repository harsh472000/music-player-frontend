import React, { useState } from "react";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { Box, Typography, useTheme } from "@mui/material";
import { loginService } from "../../services/authService";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset any previous error

    try {
      const result = await loginService(formData); // Call the login service

      if (result) {
        // If login is successful, redirect to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading once the process is done
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <CustomInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        <CustomButton
          type="submit"
          fullWidth
          title={loading ? "Logging in..." : "Login"}
          variant="primary"
          state="Filled"
          disabled={loading} // Disable button while loading
        />
      </form>
    </Box>
  );
};

export default Login;
