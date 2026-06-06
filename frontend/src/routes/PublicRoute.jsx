// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PublicRoute = () => {
    const { user, loading } = useAuth();

    // Return null while authentication status is being checked
    if (loading) return null;

    // Redirect to dashboard if user is already authenticated
    if (user) {
        return user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/" />;
    }

    // Render child routes (Login/Register) if not authenticated
    return <Outlet />;
};

export default PublicRoute;