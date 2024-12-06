import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { ToastAndroid } from 'react-native'; // For Android Toast messages
import { Icon, Rating } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCardMini from './ProductCardMini';
import ReviewComponent from '../components/Review';

const ProductDetailScreen = ({ navigation, route }) => {
    const { product } = route.params; // Product ID passed from route
    const [seller, setSeller] = useState(null); // State to store seller details
    const [quantity, setQuantity] = useState(1); // Start with quantity of 1
    const [wishlist, setWishlist] = useState([]); // Wishlist state
    const [allProducts, setAllProducts] = useState([]); // All products
    const [selectedSize, setSelectedSize] = useState(0);

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch Seller Data
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`https://preciagri-backend.onrender.com/api/users/sellerDetail/${product.sellerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });
                setSeller(response.data);
                const products = await axios.get(`https://preciagri-backend.onrender.com/api/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });
                setAllProducts(products.data.content);
            } catch (error) {
                console.error("Error fetching product or seller data:", error);
            }
        };

        fetchProduct();
    }, []);

    // Handle Quantity Change
    const handleQuantityChange = (type) => {
        if (!product) return;
        setQuantity((prevQuantity) =>
            type === 'inc' ? Math.min(prevQuantity + 1, product.sizes[0]?.quantity) : Math.max(1, prevQuantity - 1)
        );
    };

    // Toggle Wishlist
    const toggleWishlist = () => {
        setWishlist((prevWishlist) =>
            prevWishlist.includes(product._id)
                ? prevWishlist.filter((id) => id !== product._id)
                : [...prevWishlist, product._id]
        );
    };
    const handleAddToCart = async (product) => {
        try {
            const token = await AsyncStorage.getItem('token'); // Fetch the token from AsyncStorage

            const response = await axios.put(
                'https://preciagri-backend.onrender.com/api/cart/add',
                {
                    productId: product._id,
                    sizeIndx: selectedSize,
                    sizeName: product.sizes[selectedSize]?.name, // Access selected size name
                    quantity: quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                }
            );

            // Show success toast
            ToastAndroid.show('Item added to cart!', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error adding to cart:', error);
            ToastAndroid.show('Failed to add item to cart.', ToastAndroid.SHORT);
        }
    };

    // Buy Now Functionality
    const handleBuyNow = async (product) => {
        try {
            await handleAddToCart(product); // First, add the item to the cart
            navigation.navigate('Cart'); // Then, navigate to the Cart screen
        } catch (error) {
            console.error('Error handling Buy Now:', error);
        }
    };
    if (!product || !seller) {
        return (
            <View style={styles.loader}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Product Images */}
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {product.imagesUrl.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.productImage} />
                    ))}
                </ScrollView>

                {/* Back and Wishlist Icons */}
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.wishlistIcon} onPress={toggleWishlist}>
                    <Ionicons
                        name={wishlist.includes(product._id) ? "heart" : "heart-outline"}
                        size={28}
                        color="#E53935"
                    />
                </TouchableOpacity>

                {/* Product Info Section */}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.title}</Text>
                    <View style={styles.ratingRow}>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={product.ratings.average}
                            style={styles.rating}
                            tintColor="#fff"
                            type="star"
                        />
                        <Text style={styles.ratingCount}>({product.ratings.count} reviews)</Text>
                    </View>
                    <View style={styles.priceSection}>
                        <Text style={styles.originalPrice}>₹{product.sizes[selectedSize]?.price}</Text>
                        <Text style={styles.currentPrice}>₹{product.sizes[selectedSize]?.discountedPrice}</Text>
                        <Text style={styles.discount}>
                            {Math.round(
                                ((product.sizes[selectedSize]?.price - product.sizes[selectedSize]?.discountedPrice) /
                                    product.sizes[selectedSize]?.price) *
                                100
                            )}
                            % OFF
                        </Text>
                    </View>

                    {/* Size Selector Section */}
                    <View style={styles.sizeSection}>
                        <Text style={styles.sectionLabel}>Select Size:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizeContainer}>
                            {product.sizes.map((size, index) => (
                                <TouchableOpacity
                                    key={size._id}
                                    style={[
                                        styles.sizeBox,
                                        selectedSize === index && styles.selectedSizeBox, // Apply styles for selected size
                                    ]}
                                    onPress={() => {
                                        setSelectedSize(index); // Update selected size
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            selectedSize === index && styles.selectedSizeText, // Change text style for selected size
                                        ]}
                                    >
                                        {size.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Quantity Selector Section */}
                    <Text style={styles.sectionLabel}>Order Quantity:</Text>
                    <View style={styles.quantitySection}>
                        <TouchableOpacity onPress={() => handleQuantityChange('dec')}>
                            <Ionicons name="remove-circle-outline" size={26} color="#333" />
                        </TouchableOpacity>
                        <TextInput value={String(quantity)} style={styles.quantityInput} editable={false} />
                        <TouchableOpacity onPress={() => handleQuantityChange('inc')}>
                            <Ionicons name="add-circle-outline" size={26} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Product Description Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Product Description</Text>
                    <View style={styles.descriptionCard}>
                        <Text style={styles.descriptionText}>{product.description}</Text>
                    </View>
                </View>

                {/* Seller Info Section */}
                <View style={styles.sellerInfo}>
                    <Text style={styles.sellerLabel}>Seller Information</Text>
                    <Text style={styles.sellerName}>Name: {seller.businessName}</Text>
                    <Text style={styles.sellerAddress}>
                        Address: {`${seller.streetAddress}, ${seller.city}, ${seller.state}, ${seller.zipCode}`}
                    </Text>
                </View>
                {/* Customer Reviews Section */}
                <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
                <View style={styles.reviewSection}>
                    <ReviewComponent ratings={product.ratings} />
                    {/* {product.reviews.map((review, index) => (
                        <View key={index} style={styles.reviewCard}>
                            <Rating
                                imageSize={15}
                                readonly
                                startingValue={review.rating}
                                style={styles.reviewRating}
                                tintColor="#f1ffff"
                            />
                            <Text style={styles.reviewDate}>{review.date}</Text>
                            <Text style={styles.reviewerName}>{review.name}</Text>
                            <Text style={styles.reviewText}>{review.comment}</Text>
                        </View>
                    ))} */}
                </View>
                {/* Similar Products Section */}
                {allProducts && <><Text style={styles.sectionTitle}>Similar Products</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {allProducts.map((product) => (
                            <TouchableOpacity
                                key={product._id}

                                onPress={() => handleProductPress(product)}
                            >
                                <ProductCardMini navigation={navigation} product={product} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </>}
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
                    <Text style={styles.buttonText}>ADD TO CART</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton} onPress={() => handleBuyNow(product)}>
                    <Text style={styles.buttonText}>BUY NOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    productImage: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        borderRadius: 15,
        marginHorizontal: 15,
        backgroundColor: '#eee',
        resizeMode: 'contain'
    },
    wishlistIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#ffffffa0',
        padding: 5,
        borderRadius: 20,
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 10,

    },
    productInfo: {
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    rating: {
        marginRight: 8,
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
    },
    discount: {
        color: 'green',
        fontWeight: '600',
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    quantitySection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 6,
        width: 40,
        textAlign: 'center',
        marginHorizontal: 8,
        fontSize: 18,
    },
    section: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginTop: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    sizeSection: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    sizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    sizeBox: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f9f9f9',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedSizeBox: {
        borderColor: 'green', // Highlight selected size
        backgroundColor: '#dfffde',
    },
    sizeText: {
        fontSize: 16,
        color: 'green',
    },
    selectedSizeText: {
        color: 'green', // Highlight text for selected size
        fontWeight: 'bold',
    },

    descriptionCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    descriptionText: {
        fontSize: 16,
        color: '#555',
    },
    sellerInfo: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 15,
    },
    sellerLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sellerName: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    sellerAddress: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    reviewSection: {
        paddingBottom: 30,
    },
    reviewCard: {
        padding: 15,
        backgroundColor: '#f1ffff',
        borderRadius: 10,
        marginTop: 20,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    reviewRating: {
        marginBottom: 8,
    },
    reviewDate: {
        fontSize: 14,
        color: '#888',
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    reviewText: {
        fontSize: 16,
        color: '#555',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
    },
    addToCartButton: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    buyNowButton: {
        backgroundColor: 'orange',
        padding: 16,
        borderRadius: 8,
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ProductDetailScreen;