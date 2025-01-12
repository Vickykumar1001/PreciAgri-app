import React, { useState, useEffect, memo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCardWishlist from './ProductCardWishlist';
import CustomTopBar from '../components/CustomTopBar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistPage = ({ navigation }) => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch wishlist products from the API
    const fetchWishlistProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            const response = await axios.get('http://192.168.198.195:5454/api/wishlist/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data.products);
            setWishlistProducts(response.data.products || []); // Assume API response has a `products` array
        } catch (err) {
            // console.log(err);
            setError('Failed to load wishlist. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const removeFromWishlist = async (productId) => {
        try {
            console.log(productId)
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            await axios.delete(`http://192.168.198.195:5454/api/wishlist`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { productId },
            });
            setWishlistProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (error) {
            Alert.alert('Error', 'Failed to remove product from wishlist');
        }
    };
    useEffect(() => {
        fetchWishlistProducts();
    }, []);

    const MemoizedProductCard = memo(({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <ProductCardWishlist product={item} onRemove={removeFromWishlist} />
        </TouchableOpacity>
    ));

    return (
        <><CustomTopBar navigation={navigation} title={"Wishlist"} />
            <View style={styles.container}>

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        data={wishlistProducts}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <MemoizedProductCard item={item} />}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#f5f5f5' },
    row: { justifyContent: 'space-evenly', margin: 0 },
});

export default WishlistPage;