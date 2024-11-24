import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductCardMini = ({ navigation, product }) => {
    const defaultSize = product.sizes[0];
    const primaryImageUrl = product.imagesUrl[0];

    // Calculating discount percentage and amount
    const discountPercentage = Math.ceil(
        ((defaultSize.price - defaultSize.discountedPrice) / defaultSize.price) * 100
    );
    const discountAmount = defaultSize.price - defaultSize.discountedPrice;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { product: product })}
        >
            {/* Product Image */}
            <Image source={{ uri: primaryImageUrl }} style={styles.productImage} />

            {/* Product Name */}
            <Text style={styles.productName}>{product.title}</Text>

            {/* Price and Discount */}
            <View style={styles.priceContainer}>
                <Ionicons name="arrow-down" size={16} color="green" />
                <Text style={styles.discountText}>{discountPercentage}%</Text>
                <Text style={styles.currentPrice}>₹{defaultSize.discountedPrice}</Text>
                <Text style={styles.originalPrice}>₹{defaultSize.price}</Text>
            </View>

            {/* Rating and Discount Amount */}
            <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{product.ratings.average.toFixed(1)}</Text>
                <Text style={styles.discountAmount}>Discount: ₹{discountAmount}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCardMini;

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
    productImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 7,
    },
    productName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1c2022',
        marginBottom: 3,
        textAlign: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    discountText: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 12,
        paddingRight: 7,
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