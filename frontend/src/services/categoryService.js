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


/**
 * Create a new category
 */
export const createCategory = async (formData) => {
    try {
        // FormData is required for image uploads
        const response = await api.post(`${CATEGORY_BASE}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Update category
 */
export const updateCategory = async (slug, formData) => {
    try {
        // FormData is required for image uploads
        const response = await api.put(`${CATEGORY_BASE}/${slug}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Delete category
 */
export const deleteCategory = async (slug) => {
    try {
        // FormData is required for image uploads
        const response = await api.delete(`${CATEGORY_BASE}/${slug}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};