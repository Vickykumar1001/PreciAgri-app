import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductCardWishlist = ({ product }) => {
    const [isInWishlist, setIsInWishlist] = useState(true);  // Initial state is false (not in wishlist)

    // Calculate the discount percentage and discount amount
    const discount = Math.ceil(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const discountAmount = product.originalPrice - product.price;

    const toggleWishlist = () => setIsInWishlist(!isInWishlist); // Toggle wishlist state

    return (
        <View style={styles.card}>
            {/* Wishlist Icon */}
            <TouchableOpacity style={styles.wishlistIcon} onPress={toggleWishlist}>
                {/* Outer grey heart outline */}
                <Ionicons
                    name="heart"
                    size={28}
                    color={isInWishlist ? 'red' : 'grey'}  // Change color based on wishlist state
                    style={styles.outline}
                />
                {/* Inner heart, conditionally red or white based on wishlist state */}
                <Ionicons
                    name="heart"
                    size={22}
                    color={isInWishlist ? 'red' : 'white'}  // Inner heart shows red if in wishlist
                    style={styles.innerHeart}
                    aria-hidden="true"
                />
            </TouchableOpacity>

            {/* Product Image */}
            <Image source={{ uri: product.imageUrls[0] }} style={styles.productImage} />

            {/* Product Name */}
            <Text style={styles.productName}>{product.name}</Text>

            {/* Price and Discount */}
            <View style={styles.priceContainer}>
                <Ionicons name="arrow-down" size={16} color="green" />
                <Text style={styles.discountText}>{discount}%</Text>
                <Text style={styles.currentPrice}>₹{product.price}</Text>
                <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            </View>

            {/* Rating and Discount Amount */}
            <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{product.rating}</Text>
                <Text style={styles.discountAmount}>Discount: ₹{discountAmount}</Text>
            </View>
        </View>
    );
};

export default ProductCardWishlist;

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
        width: 30, // Adjusting width and height to fit the icons perfectly
        height: 30,
    },
    outline: {
        fontWeight: '800',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    innerHeart: {
        position: 'absolute',
        top: 3, // Adjust for alignment inside the outline
        left: 3,
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
    discountAmount: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
