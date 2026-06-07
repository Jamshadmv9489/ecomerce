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