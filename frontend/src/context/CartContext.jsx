import { createContext, useContext, useState, useEffect, useCallback } from 'react';
// Import your service functions here

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch cart data from API
    const fetchCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Call API to get cart items
            console.log("Cart fetched successfully");
        } catch (err) {
            setError("Failed to fetch cart");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Add a new item to the cart
    const addToCart = async (productId, quantity) => {
        try {
            // Call API to add item, then refresh cart
            fetchCart();
        } catch (err) {
            console.error("Failed to add to cart", err);
        }
    };

    // Update the quantity of an existing item
    const updateQuantity = async (productId, quantity) => {
        try {
            // Optimistically update UI state
            setCartItems(prev => prev.map(item =>
                item.productId === productId ? { ...item, quantity } : item
            ));
        } catch (err) {
            console.error("Failed to update quantity", err);
        }
    };

    // Remove an item from the cart
    const removeItem = async (productId) => {
        try {
            // Filter out the removed item from state
            setCartItems(prev => prev.filter(item => item.productId !== productId));
        } catch (err) {
            console.error("Failed to remove item", err);
        }
    };

    // Load cart data when app starts
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <CartContext.Provider value={{ cartItems, loading, error, fetchCart, addToCart, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook for easy access to cart functions
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};