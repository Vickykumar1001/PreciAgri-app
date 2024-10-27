import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard2';
import { Picker } from '@react-native-picker/picker';
import SearchTopBar from '../components/SearchTopBar';

const ShopPage = ({ navigation, route }) => {
    const [category, setCategory] = useState(route.params?.category || '');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const inputRef = useRef(null);

    const { focusInput } = route.params || {};

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

    // Focus input field if focusInput is true
    useEffect(() => {
        if (focusInput) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 300);
            return () => clearTimeout(timeout);
        }
    }, [focusInput]);

    // Filter products based on the selected category
    const filterProducts = useCallback(() => {
        let filtered = allProducts;

        if (category) {
            filtered = allProducts.filter(
                (product) =>
                    product.category.toLowerCase().includes(category.toLowerCase()) ||
                    product.name.toLowerCase().includes(category.toLowerCase())
            );
        }

        // Apply sorting
        if (sortOption === 'priceHighToLow') {
            filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        } else if (sortOption === 'priceLowToHigh') {
            filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        } else if (sortOption === 'popularity') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(filtered);
    }, [category, sortOption]);

    // Trigger filtering whenever category or sort option changes
    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    const toggleWishlist = (productId) => {
        setWishlist((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    };

    const MemoizedProductCard = memo(({ item }) => (
        <ProductCard
            navigation={navigation}
            product={item}
            isInWishlist={wishlist.includes(item.id)}
            toggleWishlist={() => toggleWishlist(item.id)}
        />
    ));

    return (
        <View style={styles.container}>
            <SearchTopBar navigation={navigation} setCategory={setCategory} inputRef={inputRef} />

            <View style={styles.sortFilterContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowSortDropdown((prev) => !prev)}
                >
                    <Text style={styles.buttonText}>Sort</Text>
                    <Ionicons name="caret-down" size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Filter button pressed')}
                >
                    <Text style={styles.buttonText}>Filter</Text>
                    <Ionicons name="filter" size={20} />
                </TouchableOpacity>
            </View>

            {showSortDropdown && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={sortOption}
                        onValueChange={(value) => {
                            setSortOption(value);
                            setShowSortDropdown(false);
                        }}
                    >
                        <Picker.Item label="Relevance" value="relevance" />
                        <Picker.Item label="Popularity" value="popularity" />
                        <Picker.Item label="Price (High to Low)" value="priceHighToLow" />
                        <Picker.Item label="Price (Low to High)" value="priceLowToHigh" />
                    </Picker>
                </View>
            )}

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MemoizedProductCard item={item} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
                ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#f5f5f5' },
    row: { justifyContent: 'space-evenly', marginVertical: 5 },
    sortFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    buttonText: { color: '#fff', fontSize: 16, marginRight: 5 },
    pickerContainer: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 3,
    },
    emptyText: { textAlign: 'center', marginTop: 20, fontSize: 18, color: '#777' },
});

export default ShopPage;
