import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard2';
import { Picker } from '@react-native-picker/picker';
import SearchTopBar from '../components/SearchTopBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopPage = ({ navigation, route }) => {
    const [category, setCategory] = useState(route.params?.category || '');
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [wishlist, setWishlist] = useState(new Set()); // Use Set for faster lookups
    const [loading, setLoading] = useState(true);
    const inputRef = useRef(null);

    const { focusInput } = route.params || {};

    // Fetch products and wishlist from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error('Token not found');
                    return;
                }

                // Fetch products
                const productsResponse = await axios.get('http://172.16.1.240:4000/api/products', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllProducts(productsResponse.data.content);
                setFilteredProducts(productsResponse.data.content);

                // Fetch wishlist
                const wishlistResponse = await axios.get(`http://172.16.1.240:4000/api/wishlist`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWishlist(new Set(wishlistResponse.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [route.params.userId]);

    // Focus input field if focusInput is true
    useEffect(() => {
        if (focusInput) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 300);
            return () => clearTimeout(timeout);
        }
    }, [focusInput]);

    // Filter and sort products
    const filterProducts = useCallback(() => {
        let filtered = [...allProducts]; // Clone to avoid mutating original array

        // Filter by category
        if (category) {
            filtered = filtered.filter(
                (product) =>
                    product.topLevelCategory?.toLowerCase().includes(category.toLowerCase()) ||
                    product.title?.toLowerCase().includes(category.toLowerCase())
            );
        }

        // Apply sorting
        if (sortOption === 'priceHighToLow') {
            filtered.sort((a, b) => (b.sizes[0]?.discountedPrice || 0) - (a.sizes[0]?.discountedPrice || 0));
        } else if (sortOption === 'priceLowToHigh') {
            filtered.sort((a, b) => (a.sizes[0]?.discountedPrice || 0) - (b.sizes[0]?.discountedPrice || 0));
        } else if (sortOption === 'popularity') {
            filtered.sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0));
        }

        setFilteredProducts(filtered);
    }, [allProducts, sortOption, category]);

    // Trigger filtering whenever category or sort option changes
    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    // Update category when route.params.category changes
    useEffect(() => {
        if (route.params?.category) {
            setCategory(route.params.category);
        }
    }, [route.params?.category]);

    const toggleWishlist = async (productId) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }

            if (wishlist.has(productId)) {
                // Remove from wishlist
                await axios.delete(`http://172.16.1.240:4000/api/wishlist`, {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { productId },
                });
                setWishlist((prev) => {
                    const newWishlist = new Set(prev);
                    newWishlist.delete(productId);
                    return newWishlist;
                });
            } else {
                // Add to wishlist
                await axios.post(
                    `http://172.16.1.240:4000/api/wishlist`,
                    { productId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setWishlist((prev) => new Set(prev).add(productId));
            }
        } catch (error) {
            console.error('Error updating wishlist:', error);
        }
    };

    const MemoizedProductCard = memo(({ item }) => (
        <ProductCard
            navigation={navigation}
            product={item}
            isInWishlist={wishlist.has(item._id)}
            toggleWishlist={() => toggleWishlist(item._id)}
        />
    ));

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text>Loading products...</Text>
            </View>
        );
    }

    return (
        <><SearchTopBar navigation={navigation} setCategory={setCategory} inputRef={inputRef} />
            <View style={styles.container}>


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
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <MemoizedProductCard item={item} />}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>}
                />
            </View>
        </>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ShopPage;
