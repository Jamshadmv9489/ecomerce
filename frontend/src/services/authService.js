import api from './api';

// BASE_URL
const AUTH_BASE = '/auth';

/**
 * Register a new user.
 * @param {Object} userData - Object containing user registration details.
 */
export const register = async (userData) => {
    try {
        const response = await api.post(`${AUTH_BASE}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};