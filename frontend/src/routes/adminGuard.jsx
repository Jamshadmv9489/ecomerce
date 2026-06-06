// src/routes/AdminGuard.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const AdminGuard = ({ children }) => {
    const { user, loading } = useAuth();

    // Return null while authentication status is being checked
    if (loading) return null;

    // Redirect admins to the admin dashboard
    if (user && user.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    // Allow access for customers or non-authenticated users
    return children;
};

export default AdminGuard;