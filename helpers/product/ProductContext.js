import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
const ProductsContext = createContext();

// Create provider component
const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/getProductList');
                if (response.data.Records) {
                    if (Array.isArray(response.data.Records)) {
                        setProducts(response.data.Records);
                    } else {
                        setProducts([response.data.Records]);
                    }
                } else {
                    setProducts([]);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error)
            }
        };
        fetchData();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsContext, ProductsProvider };
