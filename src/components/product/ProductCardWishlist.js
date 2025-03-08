import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';

const ProductCardWishlist = ({ product, navigation }) => {
    console.log(product)
    const { wishlist, toggleWishlist } = useContext(WishlistContext);
    const { addToCart } = useContext(CartContext);

    const isWishlisted = wishlist.has(product._id);
    const size = product.price_size; // First size
    const discount = Math.ceil(((size.price - size.discountedPrice) / size.price) * 100);
    const discountAmount = size.price - size.discountedPrice;

    const handleRemove = () => {
        Alert.alert(
            'Remove Product',
            'Are you sure you want to remove this product from your wishlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', onPress: () => toggleWishlist(product._id) },
            ]
        );
    };

    return (
        <View style={styles.card}>
            {/* Wishlist Icon */}
            <TouchableOpacity style={styles.wishlistIcon} onPress={() => toggleWishlist(product._id)}>
                <Ionicons
                    name={isWishlisted ? "heart" : "heart-outline"}
                    size={28}
                    color="red"
                />
            </TouchableOpacity>

            {/* Product Image */}
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: product._id })}>
                <Image source={{ uri: product.images }} style={styles.productImage} />
            </TouchableOpacity>

            {/* Product Name */}
            <Text style={styles.productName}>
                {product.name.length > 20 ? product.name.slice(0, 18) + "..." : product.name}
            </Text>

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
                <Text style={styles.rating}>{product.avgRating.toFixed(1)}</Text>
                <Text style={styles.size}>({size.size})</Text>
            </View>

            {/* Add to Cart Button */}
            <TouchableOpacity style={styles.cartButton} onPress={() => addToCart(product._id)}>
                <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
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
        backgroundColor: '#ffffffa0',
        padding: 5,
        borderRadius: 20,
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
        marginLeft: 10,
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
    size: {
        paddingLeft: 5,
        color: '#424748',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cartButton: {
        marginTop: 10,
        backgroundColor: 'green',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    cartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ProductCardWishlist;
