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
import { Icon, Rating } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCardMini from '../../components/product/ProductCardMini';
import RatingComponent from '../../components/rating/Rating';
import customFetch from '../../utils/axios';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import ProductReviews from '../../components/rating/Review';
import ProductList from '../../components/product/ProductList';
import SellerInfo from '../../components/productDetail/SellerInfo';
import ProductImages from '../../components/productDetail/Images';
import ProductInfo from '../../components/productDetail/ProductInfo';
import SizeSelector from '../../components/productDetail/SizeSelector';
import QuantitySelector from '../../components/productDetail/QuantitySelector';
import WishlistButton from '../../components/productDetail/Wishlist';

const ProductDetailScreen = ({ navigation, route }) => {
    const { productId } = route.params; // Product ID passed from route
    // console.log("productID:", productId)
    const [product, setProduct] = useState()
    const [quantity, setQuantity] = useState(1); // Start with quantity of 1
    const [wishlist, setWishlist] = useState(new Set()); // Wishlist state
    const [similarProducts, setSimilarProducts] = useState([]); // All products
    const [selectedSize, setSelectedSize] = useState(0);
    const [loading, setLoading] = useState(true);
    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Fetch Seller Data
                const token = await AsyncStorage.getItem('token');
                const response = await customFetch.get(`/products/getproductbyId/${productId}`);
                setProduct(response.data.product);
                // console.log(response.data.product)
                const products = await customFetch.get(`products/filterandSortProducts?category=${response.data.product.category}`);
                setSimilarProducts(products.data.products);
                // const wishlistResponse = await axios.get(`http://172.16.1.240:4000/api/wishlist`, {
                //     headers: { Authorization: `Bearer ${token}` },
                // });
                // setWishlist(new Set(wishlistResponse.data));
            } catch (error) {
                console.error("Error fetching product or seller data:", error);
            } finally {

                setLoading(false);
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
    // const toggleWishlist = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         if (!token) {
    //             console.error('Token not found');
    //             return;
    //         }

    //         if (wishlist.has(product._id)) {
    //             // Remove from wishlist
    //             await axios.delete(`http://172.16.1.240:4000/api/wishlist`, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //                 data: { productId: product._id },
    //             });
    //             setWishlist((prev) => {
    //                 const newWishlist = new Set(prev);
    //                 newWishlist.delete(product._id);
    //                 return newWishlist;
    //             });
    //         } else {
    //             // Add to wishlist
    //             await axios.post(
    //                 `http://172.16.1.240:4000/api/wishlist`,
    //                 { productId: product._id },
    //                 { headers: { Authorization: `Bearer ${token}` } }
    //             );
    //             setWishlist((prev) => new Set(prev).add(product._id));
    //         }
    //     } catch (error) {
    //         console.error('Error updating wishlist:', error);
    //     }
    // };



    const handleAddToCart = async (product) => {
        try {
            const token = await AsyncStorage.getItem('token'); // Fetch the token from AsyncStorage

            const response = await axios.put(
                'http://172.16.1.240:4000/api/cart/add',
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
    if (loading) {
        return <ActivityIndicator size="large" color="#E53935" />;
    }
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Product Images */}
                <ProductImages images={product.images} />

                {/* Back and Wishlist Icons */}
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.wishlistIcon} >
                    onPress={toggleWishlist}
                    <Ionicons
                        name={wishlist.has(product._id) ? "heart" : "heart-outline"}
                        size={28}
                        color="#E53935"
                    />
                </TouchableOpacity> */}
                <WishlistButton productId={product._id} />

                {/* Product Info Section */}
                <View style={styles.productDetail}>
                    <ProductInfo product={product} selectedSize={selectedSize} />
                    <View style={styles.divider} />
                    {/*<Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.ratingRow}>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={product.ratings.average}
                            style={styles.rating}
                            type="star"
                        />
                        <Text style={styles.ratingCount}>({product.ratings.count} reviews)</Text>
                    </View>
                    <View style={styles.priceSection}>
                        <Text style={styles.originalPrice}>₹{product.price_size[selectedSize]?.price}</Text>
                        <Text style={styles.currentPrice}>₹{product.price_size[selectedSize]?.discountedPrice}</Text>
                        <Text style={styles.discount}>
                            {Math.round(
                                ((product.price_size[selectedSize]?.price - product.price_size[selectedSize]?.discountedPrice) /
                                    product.price_size[selectedSize]?.price) *
                                100
                            )}
                            % OFF
                        </Text>
                    </View> */}

                    {/* Size Selector Section */}
                    <SizeSelector
                        priceSize={product.price_size}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                    />
                    <View style={styles.divider} />
                    {/* <View style={styles.sizeSection}>
                        <Text style={styles.sectionLabel}>Select Size:</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizeContainer}>
                            {product.price_size.map((size, index) => (
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
                                        {size.size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View> */}

                    <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                        maxQuantity={product.price_size[selectedSize]?.quantity}
                    />

                    <View style={styles.divider} />

                </View>

                {/* Product Description Section */}
                <ScrollView>
                    <View style={{ padding: 16, }} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Product Description</Text>
                        {product.description ? (
                            <View style={{ minHeight: 300, marginTop: 10 }}>
                                <WebView
                                    originWhitelist={['*']}
                                    source={{
                                        html: `
            <html>
                <head>
                    <style>
                        body { font-size: 3rem; padding: 10px; line-height: 1.6; }
                    </style>
                </head>
                <body>
                    ${product.description}
                </body>
            </html>
        `
                                    }}
                                    javaScriptEnabled={true}
                                />
                            </View>
                        ) : (
                            <Text>No description available</Text>
                        )}
                    </View>
                </ScrollView>

                {/* Seller Info Section */}
                <SellerInfo shopDetails={product.fullShopDetails} />
                {/* Customer Reviews Section */}
                <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
                <RatingComponent ratings={product.ratings} />
                <ProductReviews productId={product._id} />

                {/* Similar Products Section */}
                {similarProducts && <ProductList title="Similar Products" products={similarProducts} navigation={navigation} />}
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
    },
    scrollContent: {
        paddingBottom: 100,
    },
    productImage: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        // borderRadius: 15,
        backgroundColor: '#fff',
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
        left: 7,

    },
    productDetail: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    productName: {
        fontSize: 16,
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
        paddingLeft: 15,
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
        padding: 7,
        backgroundColor: '#fff',
    },
    addToCartButton: {
        backgroundColor: 'orange',
        padding: 16,
        borderRadius: 8,
        flex: 1,
        marginRight: 8,
    },
    buyNowButton: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 8,
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    divider: {
        height: 1,             // Thin line
        backgroundColor: '#ddd', // Light grey
        marginVertical: 5,    // Space above and below
    },
});

export default ProductDetailScreen;