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


/**
 * Log in a user.
 * @param {Object} credentials - Object containing email and password.
 */
export const login = async (credentials) => {
    try {
        const response = await api.post(`${AUTH_BASE}/login`, credentials);
        return response.data;
    } catch (error) {
        // This keeps the error handling consistent with your registration
        throw error.response?.data || error.message;
    }
};

/**
 * Fetches the profile of the currently authenticated user.
 * @returns {Promise<Object>} The user profile data.
 */
export const getUser = async () => {
    try {
        const response = await api.get(`${AUTH_BASE}/me`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.post(`${AUTH_BASE}/logout`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};