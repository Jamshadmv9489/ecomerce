import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Wait until the authentication check is complete
  if (loading) return null

  if (!user) return <Navigate to="/login" />;

  if (user.role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return <Outlet />
};

export default ProtectedRoute;