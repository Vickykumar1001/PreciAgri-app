import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductCard = ({ navigation, product, isInWishlist, toggleWishlist }) => {
    product.discount = Math.ceil(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
    product.discountAmount = product.originalPrice - product.currentPrice;

    return (
        <View style={styles.card}>
            {/* Discount Badge */}
            {/* <View style={styles.discountBadge}>
                
            </View> */}
            <TouchableOpacity style={styles.wishlistIcon} onPress={toggleWishlist}>
                {/* Outer grey heart outline */}
                <Ionicons
                    name="heart"
                    size={28}
                    color={isInWishlist ? 'red' : 'red'}
                    style={styles.outline}

                />
                {/* Inner heart, conditionally red or white based on wishlist state */}
                <Ionicons
                    name="heart"
                    size={22}
                    color={isInWishlist ? 'red' : 'white'}
                    style={styles.innerHeart}
                    aria-hidden="true"
                />
            </TouchableOpacity>

            {/* Product Image */}
            <Image source={{ uri: product.image }} style={styles.productImage} />

            {/* Product Name */}

            <Text style={styles.productName}>{product.name}</Text>

            {/* Ratings and Review Count */}

            {/* Price and Discount */}
            <View style={styles.priceContainer}>
                <Ionicons name="arrow-down" size={16} color="green" />
                <Text style={styles.discountText}>{product.discount}%</Text>
                <Text style={styles.currentPrice}>₹{product.currentPrice}</Text>
                <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{product.rating}</Text>
                <Text style={styles.discountAmount}>Discount: ₹{product.discountAmount}</Text>
                {/* <Text style={styles.reviewCount}> - {product.reviews} reviews</Text> */}
            </View>


            {/* Buy Now Button */}
            <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('ProductDetail')}>

                <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        width: '45%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginHorizontal: 5,
        marginVertical: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    discountBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: '#FFC107',
        // backgroundColor: 'red',
        borderRadius: 50,
        // padding: 5,
        zIndex: 1,
    },
    discountText: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 14,
        paddingRight: 7,
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
        fontWeight: 800,
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
        height: 120,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    rating: {
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    reviewCount: {
        color: '#777',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 10,
    },
    originalPrice: {
        fontSize: 14,
        color: '#777',
        textDecorationLine: 'line-through',
    },
    discountAmount: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    buyButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
