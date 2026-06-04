import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Dummy authentication check
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;