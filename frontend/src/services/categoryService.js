import api from './api';

const CATEGORY_BASE = '/categories';

/**
 * Fetch all categories from the server
 */
export const getCategories = async () => {
    try {
        const response = await api.get(`${CATEGORY_BASE}`);
        return response.data;
    } catch (error) {
        // Return server error or network message
        throw error.response?.data || error.message;
    }
};