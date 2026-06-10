import api from './api';

const PAYMENT_BASE = '/payment';


export const initiateRazorpayPayment = async (orderId) => {
    try {
        const response = await api.post(`${PAYMENT_BASE}/checkout`, { orderId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const verifyRazorpayPayment = async (paymentData) => {
    try {
        const response = await api.post(`${PAYMENT_BASE}/verify`, paymentData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};