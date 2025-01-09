import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductCardWishlist = ({ product, onRemove }) => {
    const size = product.sizes[0]; // Use the first size for simplicity
    const discount = Math.ceil(((size.price - size.discountedPrice) / size.price) * 100);
    const discountAmount = size.price - size.discountedPrice;
    const handleRemove = () => {
        Alert.alert(
            'Remove Product',
            'Are you sure you want to remove this product from your wishlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', onPress: () => onRemove(product._id) },
            ]
        );
    };
    return (
        <View style={styles.card}>
            {/* Wishlist Icon */}
            <TouchableOpacity style={styles.wishlistIcon} onPress={handleRemove}>
                <Ionicons name="heart" size={28} color="red" />
            </TouchableOpacity>

            {/* Product Image */}
            <Image source={{ uri: product.imagesUrl[0] }} style={styles.productImage} />

            {/* Product Name */}
            <Text style={styles.productName}>{product.title}</Text>

            {/* Price and Discount */}
            <View style={styles.priceContainer}>
                <Ionicons name="arrow-down" size={16} color="green" />
                <Text style={styles.discountText}>{discount}%</Text>
                <Text style={styles.currentPrice}>₹{size.discountedPrice}</Text>
                <Text style={styles.originalPrice}>₹{size.price}</Text>
            </View>

            {/* Ratings and Discount Amount */}
            <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{product.ratings.average.toFixed(1)}</Text>
                <Text style={styles.discountAmount}>Discount: ₹{discountAmount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 160,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        marginHorizontal: 5,
        marginVertical: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    wishlistIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 2,
        width: 30,
        height: 30,
    },
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 7,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 3,
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
    originalPrice: {
        fontSize: 12,
        color: '#777',
        textDecorationLine: 'line-through',
    },
    discountText: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 12,
        paddingRight: 7,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 3,
    },
    rating: {
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    discountAmount: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductCardWishlist;
