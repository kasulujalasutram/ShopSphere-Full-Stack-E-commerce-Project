
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every API request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("shopsphere_access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Automatically refresh expired access tokens
let refreshPromise = null;

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Do not retry authentication endpoints
    const authUrls = [
      "auth/login/",
      "auth/register/",
      "auth/token/refresh/",
    ];

    if (authUrls.some((url) => originalRequest.url?.includes(url))) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    const refresh = localStorage.getItem("shopsphere_refresh");

    if (!refresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${BASE_URL}auth/token/refresh/`, { refresh })
          .then((response) => {
            const newAccess = response.data.access;

            localStorage.setItem("shopsphere_access", newAccess);

            return newAccess;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccess = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;

      return API(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("shopsphere_access");
      localStorage.removeItem("shopsphere_refresh");

      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default API;
