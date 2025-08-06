import React, { useState } from "react";
import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { Box, Typography } from "@mui/material";
import { registerService } from "../../services/authService"; // Import register service
import { useNavigate } from "react-router-dom"; // For redirection

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      const result = await registerService(formData); // Call the register service

      if (result) {
        // If registration is successful, redirect to login page or dashboard
        navigate("/login");  // Redirect to login page after successful registration
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading once the process is done
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} mb={2}>
          <CustomInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <CustomInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Box>
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
          fullWidth
          type="submit"
          title={loading ? "Registering..." : "Register"}
          variant="primary"
          state="Filled"
          disabled={loading} // Disable button while loading
        />
      </form>
    </Box>
  );
};

export default Register;
