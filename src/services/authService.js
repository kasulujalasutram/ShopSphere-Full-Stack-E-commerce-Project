
import API from "./api";

// Register a new customer
export const registerUser = async (userData) => {
  const response = await API.post("auth/register/", userData);
  return response.data;
};

// Login using email and password
export const loginUser = async (email, password) => {
  const response = await API.post("auth/login/", {
    email,
    password,
  });

  localStorage.setItem("shopsphere_access", response.data.access);
  localStorage.setItem("shopsphere_refresh", response.data.refresh);

  return response.data;
};

// Get logged-in user's profile
export const getUserProfile = async () => {
  const response = await API.get("auth/profile/");
  return response.data;
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  const response = await API.patch("auth/profile/", profileData);
  return response.data;
};

// Refresh access token
export const refreshAccessToken = async () => {
  const refresh = localStorage.getItem("shopsphere_refresh");

  const response = await API.post("auth/token/refresh/", {
    refresh,
  });

  localStorage.setItem("shopsphere_access", response.data.access);

  return response.data.access;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("shopsphere_access");
  localStorage.removeItem("shopsphere_refresh");
};
