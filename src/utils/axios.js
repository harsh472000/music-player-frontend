import axios from "axios";
import { API_URL } from "./environment";
import { cookieStorage } from "./cookie";
import { toast } from "react-toastify"; // Importing react-toastify

// Setup for axios
const axiosServices = axios.create({ baseURL: API_URL + "/api" });

// Interceptor for handling errors
axiosServices.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.status === 407) {
      cookieStorage.clear();
      window.location.href = "/login";
    } else if (error.status === 406) {
      // Display error toast for unauthorized action
      toast.error("You are unauthorized to perform this action.");
    } else {
      // Display error toast for other errors
      toast.error(
        error.response.data.message || error.response.data.msg || "An error occurred"
      );
    }
    return Promise.reject(error);
  }
);

export default axiosServices;
