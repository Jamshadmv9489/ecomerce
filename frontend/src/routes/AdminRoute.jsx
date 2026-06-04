import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const isAuthenticated = true;

    const user = {
        role: "admin",
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return user.role === "admin"
        ? <Outlet />
        : <Navigate to="/" replace />;
};

export default AdminRoute;