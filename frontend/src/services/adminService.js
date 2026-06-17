import api from './api';

// BASE_URL
const ADMIN_BASE = '/admin';

export const fetchAllOrders = async () => {
    try {
        const response = await api.get(`${ADMIN_BASE}/orders`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.put(`${ADMIN_BASE}/orders/${orderId}/status`, { status });
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await api.get(`${ADMIN_BASE}/users`);
        return response.data.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};