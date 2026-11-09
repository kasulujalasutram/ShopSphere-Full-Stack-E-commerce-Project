
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  getUserProfile,
} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check whether customer is already logged in
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem(
        "shopsphere_access"
      );

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("Session verification failed:", error);

        logoutUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (username, password) => {
    await loginUser(username, password);

    const profile = await getUserProfile();

    setUser(profile);

    return profile;
  };

  // Logout
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Check authentication
  const isAuthenticated = Boolean(user);

  // Check admin access
  const isAdmin = Boolean(user?.is_staff);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
