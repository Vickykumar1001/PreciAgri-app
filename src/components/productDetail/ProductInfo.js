import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';

// ProductInfo Component - Displays product details including name, ratings, and pricing.
const ProductInfo = ({ product, selectedSize }) => {
    if (!product) return null;

    const priceData = product.price_size?.[selectedSize] || {};
    const discountPercent = priceData.price
        ? Math.round(((priceData.price - priceData.discountedPrice) / priceData.price) * 100)
        : 0;

    return (
        <View style={styles.productInfo}>
            {/* Product Name */}
            <Text style={styles.productName}>{product.name}</Text>

            {/* Rating Section */}
            <View style={styles.ratingRow}>
                <Rating
                    imageSize={16}
                    readonly
                    startingValue={product.ratings?.average || 0}
                    style={styles.rating}
                    type="star"
                />
                <Text style={styles.ratingCount}>({product.ratings?.count || 0} reviews)</Text>
            </View>

            {/* Price Section */}
            <View style={styles.priceSection}>
                <Text style={styles.originalPrice}>₹{priceData.price || 'N/A'}</Text>
                <Text style={styles.currentPrice}>₹{priceData.discountedPrice || 'N/A'}</Text>
                {discountPercent > 0 && (
                    <Text style={styles.discount}>{discountPercent}% OFF</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    productInfo: {
        marginHorizontal: 10,
        padding: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    rating: {
        marginRight: 6,
    },
    ratingCount: {
        fontSize: 14,
        color: '#777',
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        marginRight: 8,
        color: '#999',
        fontSize: 16,
    },
    currentPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 8,
        color: '#2E7D32',
    },
    discount: {
        color: 'red',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default ProductInfo;
