import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard2'; // Reuse ProductCard for consistency

import SearchTopBar from '../components/SearchTopBar';
import ProductFilterSort from './ProductFilterSort';

const ShopPage = ({ navigation, route }) => {
    console.log(route.params)
    const [category, setCategory] = useState(route.params.category);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]); // Track wishlist
    const inputRef = useRef(null); // Create a ref to the TextInput

    const { focusInput } = route.params || {}; // Extract parameter from route

    // Conditionally focus the TextInput based on 'focusInput' parameter
    useEffect(() => {
        if (focusInput) {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 300); // Slight delay for smoother navigation

            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [focusInput]);
    const allProducts = [
        {
            id: '1',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENlWkwP3PHLtWQo4RiBg5r_cUCqCCw-bH1w&s',
            name: 'Fresh Tomatoes',
            rating: 4.7,
            reviews: 120,
            currentPrice: 60,
            originalPrice: 80,
            category: 'vegetables',
        },
        {
            id: '2',
            image: 'https://cdn.pixabay.com/photo/2017/09/26/13/21/apples-2788599_1280.jpg',
            name: 'Apples (1 Kg)',
            rating: 4.5,
            reviews: 92,
            currentPrice: 180,
            originalPrice: 220,
            category: 'fruits',
        },
        {
            id: '3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSrCZTZcv8qCqHOIpl9VEw9B4VvD2XFL4Tg&s',
            name: 'Basmati Rice (5 Kg)',
            rating: 4.3,
            reviews: 48,
            currentPrice: 500,
            originalPrice: 600,
            category: 'grains',
        },
        {
            id: '4',
            image: 'https://m.media-amazon.com/images/I/71xuH19n5YL._AC_UF1000,1000_QL80_.jpg',
            name: 'Wheat Seeds (2 Kg)',
            rating: 4.6,
            reviews: 66,
            currentPrice: 350,
            originalPrice: 400,
            category: 'seeds',
        },
        {
            id: '5',
            image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
            name: 'Bananas (Dozen)',
            rating: 4.8,
            reviews: 110,
            currentPrice: 50,
            originalPrice: 70,
            category: 'fruits',
        },
        {
            id: '6',
            image: 'https://www.purepunjabi.co.uk/wp-content/uploads/2017/01/Chickpeas.png',
            name: 'Chickpeas (1 Kg)',
            rating: 4.2,
            reviews: 35,
            currentPrice: 120,
            originalPrice: 150,
            category: 'grains',
        },
        {
            id: '7',
            image: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg',
            name: 'Potatoes (2 Kg)',
            rating: 4.5,
            reviews: 78,
            currentPrice: 50,
            originalPrice: 70,
            category: 'vegetables',
        },
        {
            id: '8',
            image: 'https://static.wixstatic.com/media/5f378b_cfc7fbfd9df74b8aae0393776b9416f4~mv2.jpg',
            name: 'Sunflower Seeds (1 Kg)',
            rating: 4.3,
            reviews: 28,
            currentPrice: 200,
            originalPrice: 250,
            category: 'seeds',
        },
    ];

    // Filter products based on the selected category
    useEffect(() => {
        const filtered = category
            ? allProducts.filter((product) =>
                product.name.toLowerCase().includes(category.toLowerCase()) ||
                product.category.toLowerCase().includes(category.toLowerCase())
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
        <ProductCard
            navigation={navigation}
            product={item}
            isInWishlist={isInWishlist(item.id)}
            toggleWishlist={() => toggleWishlist(item.id)}

        />
    ));

    return (
        <View style={styles.container}>
            <SearchTopBar navigation={navigation} setCategory={setCategory} inputRef={inputRef} />
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
