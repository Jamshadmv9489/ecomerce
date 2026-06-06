import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/authContext';

const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user && user.role === 'admin') {
        return <Outlet />;
    }

    return <Navigate to="/" />;
};

export default AdminRoute;