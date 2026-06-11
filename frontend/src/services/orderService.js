import api from './api'; 

// BASE_URL
const ORDER_BASE = '/order';

export const createOrder = async (orderData) => {
    try {
        const response = await api.post(`${ORDER_BASE}`, orderData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getMyOrders = async () => {
    try {
        const response = await api.get(`${ORDER_BASE}/myorders`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};