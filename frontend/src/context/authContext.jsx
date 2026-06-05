import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUser, logoutUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile to persist session
    const checkAuth = useCallback(async () => {

        if (user) return;

        setLoading(true);
        try {
            const response = await getUser();
            setUser(response.data);
            return response.data;
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Initial auth check on mount
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy context consumption
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};