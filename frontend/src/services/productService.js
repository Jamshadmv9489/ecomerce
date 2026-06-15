import api from "./api";

// BASE_URL
const PRODUCT_BASE = '/products';

export const getProducts = async () => {
    try {
        // Fetch all products from the server
        const response = await api.get(`${PRODUCT_BASE}`);
        return response.data;
    } catch (error) {
        // Throw error message to be handled by context
        throw error.response?.data || error.message;
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const response = await api.get(`/products/${slug}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Create a new Product
 */
export const createProduct = async (formData) => {
    try {
        // FormData is required for image uploads
        const response = await api.post(`${PRODUCT_BASE}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Update product
 */
export const updateProduct = async (slug, formData) => {
    try {
        // FormData is required for image uploads
        const response = await api.put(`${PRODUCT_BASE}/${slug}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

/**
 * Delete Product
 */
export const deleteProduct = async (slug) => {
    try {
        // FormData is required for image uploads
        const response = await api.delete(`${PRODUCT_BASE}/${slug}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};