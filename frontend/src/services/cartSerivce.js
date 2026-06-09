import api from './api';

const CART_BASE = '/cart'

// Add a new product to the cart or update existing quantity
export const addToItem = async (productId, quantity) => {
    try {
        const response = await api.post(`${CART_BASE}`, { productId, quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};