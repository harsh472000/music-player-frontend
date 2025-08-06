import axiosServices from '../utils/axios';
import { toast } from 'react-toastify';
import { cookieStorage } from '../utils/cookie';
export const loginService = async (body) => {
  try {
    const response = await axiosServices.post("/auth/login", body);

    if (response.data.token) {
      cookieStorage.setItem("jwt_token", response.data.token);
      const userData = response.data.user;
      cookieStorage.setItem("user_data", JSON.stringify(userData));
      toast.success("Login successful");
      return response.data;
    }

    throw new Error("Login failed");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    throw error;
  }
};

export const registerService = async (body) => {
  try {
    const response = await axiosServices.post("/auth/register", body);

    if (response.data.token) {
      cookieStorage.setItem("jwt_token", response.data.token);
      toast.success("Registration successful. You are now logged in.");
      return response.data;
    }

    throw new Error("Registration failed");
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed");
    throw error;
  }
};
