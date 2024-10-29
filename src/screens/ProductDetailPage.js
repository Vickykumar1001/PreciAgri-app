import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BarChart } from 'react-native-chart-kit';
import ReviewComponent from '../components/Review';
import ProductCardMini from './ProductCardMini'; // Reuse ProductCard for consistency
// Dummy product data
const product = {
    name: 'Fresh Organic Tomatoes',
    description: 'Rich in flavor, organically grown, and free from harmful pesticides. Ideal for salads, sauces, and everyday cooking.',
    imageUrls: [
        'https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg',
        'https://www.wur.nl/upload/5618ef52-f5f3-44a7-a38a-3492cec9fe5c_tomato_01.jpg',
    ],
    productDescription: {
        title: 'Product Overview',
        paragraph: 'These farm-fresh organic tomatoes are grown using sustainable methods, ensuring top quality with every batch. They are hand-picked at peak ripeness, providing a burst of flavor that complements both raw and cooked dishes. Loaded with essential nutrients like vitamins A and C, they promote a healthy immune system and contribute to a balanced diet.'
    },
    price: 60,
    originalPrice: 80,
    discount: 25,
    quantity: 1,
    seller: {
        name: 'Organic Farms',
        address: '45 Farm Lane, India',
    },
    rating: 4.6,
    ratingCount: [1, 0, 2, 5, 18],  // 1-star: 1, 2-star: 0, 3-star: 2, 4-star: 5, 5-star: 18
    reviews: [
        {
            name: 'Manju Nath',
            date: '6th Aug 2021',
            rating: 5,
            comment: 'Very juicy and flavorful, perfect for my salads.'
        },
        {
            name: 'Vrajraj Ji',
            date: '23rd July 2021',
            rating: 4,
            comment: 'Good quality but slightly overripe on delivery.'
        },
        {
            name: 'Paresh',
            date: '4th Sep 2019',
            rating: 5,
            comment: 'One of the best tomatoes I’ve ever bought!'
        },
    ],
};


const ProductDetailScreen = ({ navigation }) => {
    const [quantity, setQuantity] = useState(product.quantity);
    const allProducts = [
        {
            id: '1',
            image: 'https://cdn.pixabay.com/photo/2022/09/05/09/50/tomatoes-7433786_1280.jpg',
            name: 'Fresh Tomatoes',
            rating: 4.7,
            reviews: 120,
            currentPrice: 60,
            originalPrice: 80,
            category: 'vegetables',
        },
        {
            id: '2',
            image: 'https://cdn.pixabay.com/photo/2017/09/26/13/21/apples-2788599_1280.jpg',
            name: 'Apples (1 Kg)',
            rating: 4.5,
            reviews: 92,
            currentPrice: 180,
            originalPrice: 220,
            category: 'fruits',
        },
        {
            id: '3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSrCZTZcv8qCqHOIpl9VEw9B4VvD2XFL4Tg&s',
            name: 'Basmati Rice (5 Kg)',
            rating: 4.3,
            reviews: 48,
            currentPrice: 500,
            originalPrice: 600,
            category: 'grains',
        },
        {
            id: '4',
            image: 'https://m.media-amazon.com/images/I/71xuH19n5YL._AC_UF1000,1000_QL80_.jpg',
            name: 'Wheat Seeds (2 Kg)',
            rating: 4.6,
            reviews: 66,
            currentPrice: 350,
            originalPrice: 400,
            category: 'seeds',
        },
        {
            id: '5',
            image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
            name: 'Bananas (Dozen)',
            rating: 4.8,
            reviews: 110,
            currentPrice: 50,
            originalPrice: 70,
            category: 'fruits',
        },
        {
            id: '6',
            image: 'https://www.purepunjabi.co.uk/wp-content/uploads/2017/01/Chickpeas.png',
            name: 'Chickpeas (1 Kg)',
            rating: 4.2,
            reviews: 35,
            currentPrice: 120,
            originalPrice: 150,
            category: 'grains',
        },
        {
            id: '7',
            image: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg',
            name: 'Potatoes (2 Kg)',
            rating: 4.5,
            reviews: 78,
            currentPrice: 50,
            originalPrice: 70,
            category: 'vegetables',
        },
        {
            id: '8',
            image: 'https://static.wixstatic.com/media/5f378b_cfc7fbfd9df74b8aae0393776b9416f4~mv2.jpg',
            name: 'Sunflower Seeds (1 Kg)',
            rating: 4.3,
            reviews: 28,
            currentPrice: 200,
            originalPrice: 250,
            category: 'seeds',
        },
    ];
    const [wishlist, setWishlist] = useState([]); // Track wishlist
    // const isInWishlist = useCallback(
    //     (productId) => wishlist.includes(productId),
    //     [wishlist]
    // );
    // const handleQuantityChange = (type) => {
    //     setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
    // };

    return (
        <View style={styles.container}>
            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Product Image Section */}
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {product.imageUrls.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.productImage} />
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.wishlistIcon}>
                    {/* Outer grey heart outline */}
                    <Ionicons
                        name="heart"
                        size={28}
                        color={'red'}
                        style={styles.outline}
                    />
                    {/* Inner heart */}
                    <Ionicons
                        name="heart"
                        size={22}
                        color={'red'}
                        style={styles.innerHeart}
                    />
                </TouchableOpacity>

                {/* Product Info */}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={product.rating}
                        style={{ alignSelf: 'flex-start' }}
                    />
                    <View style={styles.priceSection}>
                        <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                        <Text style={styles.currentPrice}>₹{product.price}</Text>
                        <Text style={styles.discount}>{product.discount}% OFF</Text>
                    </View>
                    <Text>Order Qty:</Text>
                    <View style={styles.quantitySection}>
                        <TouchableOpacity >
                            <Ionicons name="remove" size={24} />
                        </TouchableOpacity>
                        <TextInput value={String(quantity)} style={styles.quantityInput} editable={false} />
                        <TouchableOpacity >
                            <Ionicons name="add" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Product Description */}
                <View style={styles.productDescription}>
                    <Text style={styles.sectionTitle}>Product Description</Text>
                    <Text style={styles.reviewerName}>{product.productDescription.title}</Text>
                    <Text>{product.productDescription.paragraph}</Text>
                </View>

                {/* Seller Info */}
                <View style={styles.sellerInfo}>
                    <Text>Seller: {product.seller.name}</Text>
                    <Text>Address: {product.seller.address}</Text>
                </View>

                {/* Customer Reviews */}
                <Text style={styles.sectionTitle}>Customer Reviews</Text>
                <ReviewComponent reviewCount={product.ratingCount} />
                {product.reviews.map((review, index) => (
                    <View key={index} style={styles.reviewCard}>
                        <Rating imageSize={15} readonly startingValue={review.rating} />
                        <Text style={styles.reviewDate}>{review.date}</Text>
                        <Text style={styles.reviewerName}>{review.name}</Text>
                        <Text>{review.comment}</Text>
                    </View>
                ))}

                {/* Similar Products */}
                <Text style={styles.sectionTitle}>Similar Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {allProducts.map((product, index) => (
                        <ProductCardMini key={index} product={product} />
                    ))}
                </ScrollView>
            </ScrollView>

            {/* Footer - Fixed at the bottom */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.buttonText}>ADD TO CART</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton} onPress={() => {
                    navigation.navigate('Cart')
                }
                }>
                    <Text style={styles.buttonText}>BUY NOW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        paddingBottom: 100, // Ensure space for footer
    },
    productImage: {
        width: Dimensions.get('window').width - 30,
        height: 300,
        resizeMode: 'cover',
    },
    wishlistIcon: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 2,
        width: 30,
        height: 30,
    },
    outline: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    innerHeart: {
        position: 'absolute',
        top: 3,
        left: 3,
    },
    backIcon: {
        position: 'absolute',
        top: 20,
        left: 10,
    },
    productInfo: {
        padding: 16,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    currentPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    discount: {
        color: 'green',
    },
    quantitySection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    quantityInput: {
        borderWidth: 1,
        padding: 4,
        width: 40,
        textAlign: 'center',
    },
    productDescription: {
        padding: 16,
    },
    sellerInfo: {
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 8,
    },
    reviewCard: {
        padding: 16,
        backgroundColor: '#fff',
        marginVertical: 4,
    },
    reviewDate: {
        fontSize: 12,
        color: 'gray',
    },
    reviewerName: {
        fontWeight: 'bold',
        marginVertical: 4,
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
    sectionTitle: {
        paddingLeft: 8,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ProductDetailScreen;
