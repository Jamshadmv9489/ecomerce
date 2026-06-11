import { createContext, useContext, useState } from 'react';

import { getMyOrders } from '../services/orderService';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    // State to store the most recent order details
    const [lastOrder, setLastOrder] = useState(null);

    // State to store the list of past orders
    const [ordersHistory, setOrdersHistory] = useState([]);

    // Fetch order history from the API
    const fetchOrdersHistory = async () => {
        setLoading(true);
        try {
            const response = await getMyOrders(); // API Call
            setOrdersHistory(response.data);
        } catch (err) {
            console.error("Error fetching history:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderContext.Provider value={{ lastOrder, setLastOrder, ordersHistory, fetchOrdersHistory, loading }}>
            {children}
        </OrderContext.Provider>
    );
};

// Custom hook to use the order context
export const useOrder = () => useContext(OrderContext);
