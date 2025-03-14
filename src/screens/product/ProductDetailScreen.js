import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import customFetch from '../../utils/axios';
import { CartContext } from '../../context/CartContext';

import ProductImages from '../../components/productDetail/Images';
import ProductInfo from '../../components/productDetail/ProductInfo';
import SizeSelector from '../../components/productDetail/SizeSelector';
import QuantitySelector from '../../components/productDetail/QuantitySelector';
import WishlistButton from '../../components/productDetail/Wishlist';
import SellerInfo from '../../components/productDetail/SellerInfo';
import RatingComponent from '../../components/rating/Rating';
import ProductReviews from '../../components/rating/Review';
import ProductList from '../../components/product/ProductList';

const ProductDetailScreen = ({ navigation, route }) => {
    const { productId } = route.params;
    const { isProductInCart, addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(0);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [webViewHeight, setWebViewHeight] = useState(100);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await customFetch.get(`/products/getproductbyId/${productId}`);
                setProduct(response.data.product);
                const similarResponse = await customFetch.get(`/products/filteredproducts?category=${response.data.product.category}`);
                setSimilarProducts(similarResponse.data.data.products);
            } catch (err) {
                setError('Failed to load product details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleBuyNow = async () => {
        if (!product) return;
        try {
            await addToCart(product, quantity, selectedSize);
            navigation.navigate('Cart');
        } catch (error) {
            console.error('Error handling Buy Now:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="green" />
                <Text>Loading product details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.errorButton}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ProductImages images={product.images} />
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <WishlistButton productId={product._id} />

                <View style={styles.productDetail}>
                    <ProductInfo product={product} selectedSize={selectedSize} />
                    <View style={styles.divider} />
                    <SizeSelector
                        priceSize={product.price_size}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                    />
                    <View style={styles.divider} />
                    <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                        maxQuantity={product.price_size[selectedSize]?.quantity}
                    />
                    <View style={styles.divider} />
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>Product Description</Text>
                    {product.description ? (
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: `<html><body>${product.description}</body></html>` }}
                            style={{ height: 300 }}
                        />
                    ) : (
                        <Text>No description available</Text>
                    )}
                </View>

                <SellerInfo shopDetails={product.fullShopDetails} />
                <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
                <RatingComponent ratings={product.ratings} />
                <ProductReviews productId={product._id} />

                {similarProducts.length > 0 && (
                    <ProductList title="Similar Products" products={similarProducts} navigation={navigation} />
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => isProductInCart(productId) ? navigation.navigate("Cart") : addToCart(product, quantity, selectedSize)}
                >
                    <Text style={styles.buttonText}>
                        {isProductInCart(productId) ? "GO TO CART" : "ADD TO CART"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
                    <Text style={styles.buttonText}>BUY NOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    scrollContent: { paddingBottom: 100 },
    backIcon: { position: 'absolute', top: 20, left: 7 },
    productDetail: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    sectionTitle: { paddingLeft: 15, fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    descriptionContainer: { padding: 16 },
    divider: { height: 1, backgroundColor: '#ddd', marginVertical: 5 },
    footer: { position: 'absolute', bottom: 0, flexDirection: 'row', padding: 7, backgroundColor: '#fff' },
    addToCartButton: { backgroundColor: 'orange', padding: 16, borderRadius: 8, flex: 1, marginRight: 8 },
    buyNowButton: { backgroundColor: 'green', padding: 16, borderRadius: 8, flex: 1 },
    buttonText: { color: '#fff', textAlign: 'center' },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    errorText: { color: 'red', fontSize: 16 },
    errorButton: { marginTop: 10, backgroundColor: 'red', padding: 10, borderRadius: 5 },
});

export default ProductDetailScreen;
