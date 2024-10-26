import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard2'; // Reuse ProductCard for consistency

import WishlistTopBar from '../components/WishListTopBar';
import ProductFilterSort from './ProductFilterSort';
import ProductCardWishlist from './ProductCardWishlist';

const ShopPage = ({ navigation, route }) => {
    const [category, setCategory] = useState(route.params);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]); // Track wishlist
    const allProducts = [
        {
            id: '1',
            image: 'https://images.pexels.com/photos/3952232/pexels-photo-3952232.jpeg?auto=compress&cs=tinysrgb&w=250&h=250',
            name: 'Organic Fertilizer',
            rating: 4.6,
            reviews: 88,
            currentPrice: 300,
            originalPrice: 450,
            category: 'fertilizer',
        },
        {
            id: '2',
            image: 'https://images.pexels.com/photos/7210131/pexels-photo-7210131.jpeg?auto=compress&cs=tinysrgb&w=250&h=250',
            name: 'Manual Sprayer Pump',
            rating: 4.3,
            reviews: 43,
            currentPrice: 799,
            originalPrice: 950,
            category: 'tool',
        },
        {
            id: '3',
            image: 'https://images.pexels.com/photos/7210230/pexels-photo-7210230.jpeg?auto=compress&cs=tinysrgb&w=250&h=250',
            name: 'Farming Tool Set',
            rating: 4.0,
            reviews: 18,
            currentPrice: 1299,
            originalPrice: 1600,
            category: 'tool',
        },
        {
            id: '4',
            image: 'https://images.unsplash.com/photo-1626335842811-2b2e08c51f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=250&h=250&q=80',
            name: 'Insecticide Spray',
            rating: 4.5,
            reviews: 54,
            currentPrice: 500,
            originalPrice: 650,
            category: 'tool',
        },
        {
            id: '5',
            image: 'https://images.pexels.com/photos/3952232/pexels-photo-3952232.jpeg?auto=compress&cs=tinysrgb&w=250&h=250',
            name: 'Organic Fertilizer',
            rating: 4.6,
            reviews: 88,
            currentPrice: 300,
            originalPrice: 450,
            category: 'fertilizer',
        },
        {
            id: '6',
            image: 'https://images.pexels.com/photos/7210131/pexels-photo-7210131.jpeg?auto=compress&cs=tinysrgb&w=250&h=250',
            name: 'Manual Sprayer Pump',
            rating: 4.3,
            reviews: 43,
            currentPrice: 799,
            originalPrice: 950,
            category: 'tool',
        },
        {
            id: '7',
            image: 'https://images.pexels.com/photos/7210230/pexels-photo-7210230.jpeg?auto=compress&cs=tinysrgb&w=250&h=250',
            name: 'Farming Tool Set',
            rating: 4.0,
            reviews: 18,
            currentPrice: 1299,
            originalPrice: 1600,
            category: 'tool',
        },
        {
            id: '8',
            image: 'https://images.unsplash.com/photo-1626335842811-2b2e08c51f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=250&h=250&q=80',
            name: 'Insecticide Spray',
            rating: 4.5,
            reviews: 54,
            currentPrice: 500,
            originalPrice: 650,
            category: 'tool',
        },
    ];

    // Filter products based on the selected category
    useEffect(() => {
        const filtered = category
            ? allProducts.filter((product) =>
                product.name.toLowerCase().includes(category.toLowerCase()) ||
                product.category.toLowerCase() === category.toLowerCase()
            )
            : allProducts;
        setFilteredProducts(filtered);
    }, [category]);
    // Toggle product in/out of wishlist
    const toggleWishlist = (productId) => {
        setWishlist((prevWishlist) =>
            prevWishlist.includes(productId)
                ? prevWishlist.filter((id) => id !== productId)
                : [...prevWishlist, productId]
        );
    };

    // Check if product is in wishlist
    const isInWishlist = useCallback(
        (productId) => wishlist.includes(productId),
        [wishlist]
    );

    // Memoized ProductCard for better performance
    const MemoizedProductCard = memo(({ item }) => (
        <ProductCardWishlist
            product={item}

        />
    ));

    return (
        <View style={styles.container}>
            <WishlistTopBar navigation={navigation} />
            {/* <ProductFilterSort products={filteredProducts} setFilteredProducts={setFilteredProducts} /> */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MemoizedProductCard item={item} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />


            {/* Footer Navigation */}
            {/* <View style={styles.footer}>
                <FooterButton
                    icon="home"
                    label="Home"
                    onPress={() => navigation.navigate('HomePage')}
                    isActive={false}
                />
                <FooterButton
                    icon="storefront"
                    label="Shop"
                    onPress={() => navigation.navigate('Shop')}
                    isActive={true}
                />
                <FooterButton
                    icon="person"
                    label="Profile"
                    onPress={() => navigation.navigate('Profile')}
                    isActive={false}
                />
            </View> */}
        </View>
    );
};

// FooterButton Component to simplify footer UI
const FooterButton = ({ icon, label, onPress, isActive }) => (
    <TouchableOpacity onPress={onPress} style={styles.footerButton}>
        <Ionicons name={icon} size={28} color={isActive ? '#4CAF50' : '#777'} />
        <Text style={[styles.footerText, isActive && { color: '#4CAF50' }]}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    row: {
        justifyContent: 'space-evenly',
        maragin: 0,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    footerButton: { alignItems: 'center' },
    footerText: { fontSize: 14, color: '#777', marginTop: 4 },
});

export default ShopPage;
