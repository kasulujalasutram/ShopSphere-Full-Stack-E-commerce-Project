
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext.jsx";

function ProtectedRoute({ adminOnly = false }) {
  const {
    user,
    loading,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const location = useLocation();

  // Wait until authentication check finishes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // Redirect unauthenticated customers to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Only admin users can access admin pages
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
