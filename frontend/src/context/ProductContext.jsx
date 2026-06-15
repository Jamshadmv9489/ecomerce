import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { getProducts } from '../services/productService';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch products from the API
    const fetchProducts = useCallback(async () => {

        setLoading(true);
        setError(null);
        try {
            const response = await getProducts();
            setProducts(response.data);
            console.log(response);

        } catch (err) {
            setError("Failed to fetch products");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [products.length]);

    // Fetch products automatically when the component mounts
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <ProductContext.Provider value={{ products, loading, setLoading, error, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to access ProductContext easily
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error('useProducts must be used within a ProductProvider');
    return context;
};