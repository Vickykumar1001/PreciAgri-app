import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Context
export const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from AsyncStorage on app start
    useEffect(() => {
        const loadWishlist = async () => {
            const savedWishlist = await AsyncStorage.getItem('wishlist');
            if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        };
        loadWishlist();
    }, []);

    // Add or Remove item from wishlist
    const toggleWishlist = async (product) => {
        let updatedWishlist = [...wishlist];
        const index = updatedWishlist.findIndex(item => item._id === product._id);

        if (index !== -1) {
            updatedWishlist.splice(index, 1); // Remove item if already in wishlist
        } else {
            updatedWishlist.push(product); // Add item to wishlist
        }

        setWishlist(updatedWishlist);
        await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <CartContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </CartContext.Provider>
    );
};
