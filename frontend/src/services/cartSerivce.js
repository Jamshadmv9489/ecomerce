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

// Fetch the current user's cart data
export const getCart = async () => {
    try {
        const response = await api.get(`${CART_BASE}`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// Update the quantity of a specific item in the cart
export const updateCartQuantity = async (productId, quantity) => {
    try {
        const response = await api.put(`${CART_BASE}/update-quantity`, { productId, quantity });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Remove a specific product from the cart
export const removeFromCart = async (productId) => {
    try {
        const response = await api.delete(`${CART_BASE}/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};