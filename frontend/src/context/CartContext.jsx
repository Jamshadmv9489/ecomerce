import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { addToItem, getCart, removeFromCart, updateCartQuantity } from '../services/cartSerivce';
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
            const response = await getCart();
            setCartItems(response);
            console.log("Cart fetched successfully");
            console.log(response);

        } catch (err) {
            setError("Failed to fetch cart");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Add a new item to the cart
    const addToCart = async (productId, quantity) => {
        setLoading(true);
        try {
            // Call API to add item, then refresh cart
            await addToItem(productId, quantity);
            fetchCart();
            console.log("Item added successfully");
        } catch (err) {
            console.error("Failed to add to cart", err);
        } finally {
            setLoading(false);
        }
    };

    // Update the quantity of an existing item
    const updateQuantity = async (productId, quantity) => {
        setLoading(true);
        try {
            const response = await updateCartQuantity(productId, quantity);
            setCartItems(response.data);

        } catch (err) {
            console.error("Failed to update quantity", err);
        } finally {
            setLoading(false);
        }
    };

    // Remove an item from the cart
    const removeItem = async (productId) => {
        setLoading(true);
        try {
            const response = await removeFromCart(productId);
            setCartItems(response.data);
        } catch (err) {
            console.error("Failed to remove item", err);
        } finally {
            setLoading(false);
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