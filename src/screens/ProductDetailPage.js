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


const ProductDetailScreen = ({ navigation, route }) => {
    const { productId } = route.params || { productId: 5 }; // Destructure productId from route params
    const [quantity, setQuantity] = useState(1); // Start with quantity of 1

    const products = [
        // Seeds and Crops
        {
            id: 1,
            name: 'SRI Rice Seeds',
            category: 'Seeds',
            description: 'System of Rice Intensification (SRI) variety, suited for Mizoram’s hilly terrains and wet climate.',
            imageUrls: [
                'https://5.imimg.com/data5/SELLER/Default/2024/3/404980651/GJ/NK/AG/33516101/sri-vardhan-999-paddy-seeds.jpg',
                'https://m.media-amazon.com/images/I/A1kOX5L0ezL._AC_UF1000,1000_QL80_.jpg',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'High-yield rice seeds ideal for terrace farming. Adapted to grow with minimal water and sustainable practices.'
            },
            price: 400,
            originalPrice: 500,
            discount: 20,
            quantity: 15,
            seller: {
                name: 'MizoAgro Seeds',
                address: 'Aizawl, Mizoram, India',
            },
            rating: 4.7,
            ratingCount: [2, 1, 5, 8, 20],
            reviews: [
                { name: 'Chhingpuii Ralte', date: '5th Jan 2024', rating: 5, comment: 'Great yield and easy to cultivate on terraced fields.' }
            ],
        },
        {
            id: 2,
            name: 'Ginger Rhizomes',
            category: 'Crops',
            description: 'High-quality ginger rhizomes, well-suited to Mizoram’s soil and climate.',
            imageUrls: [
                'https://housing.com/news/wp-content/uploads/2022/11/ginger-plant-compressed.jpg',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'Fresh ginger rhizomes ideal for high-quality production, widely used in local cuisine and medicine.'
            },
            price: 250,
            originalPrice: 300,
            discount: 17,
            quantity: 25,
            seller: {
                name: 'Hmar Organic Farms',
                address: 'Lunglei, Mizoram, India',
            },
            rating: 4.8,
            ratingCount: [1, 1, 2, 10, 30],
            reviews: [
                { name: 'Lalmuansangi', date: '20th Feb 2024', rating: 5, comment: 'Excellent quality and highly aromatic.' }
            ],
        },

        // Fertilizers
        {
            id: 3,
            name: 'Organic Compost Fertilizer',
            category: 'Fertilizers',
            description: 'Compost fertilizer ideal for organic farming in Mizoram.',
            imageUrls: [
                'https://nurserylive.com/cdn/shop/products/nurserylive-g-soil-and-fertilizers-polestar-organic-food-waste-compost-1-kg-set-of-2_512x512.jpg?v=1634226541',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'Enhances soil health and crop productivity through organic matter, perfect for hilly farming areas.'
            },
            price: 200,
            originalPrice: 250,
            discount: 20,
            quantity: 30,
            seller: {
                name: 'EcoMizo Fertilizers',
                address: 'Champhai, Mizoram, India',
            },
            rating: 4.6,
            ratingCount: [2, 1, 5, 12, 20],
            reviews: [
                { name: 'Lalthanmawia', date: '5th Mar 2024', rating: 5, comment: 'Great for improving soil fertility naturally.' }
            ],
        },

        // Pesticides
        {
            id: 4,
            name: 'Neem-Based Organic Pesticide',
            category: 'Pesticides',
            description: 'Eco-friendly neem-based pesticide to keep crops pest-free without harming the soil.',
            imageUrls: [
                'https://krishisevakendra.in/cdn/shop/files/Dr.neem300.webp?v=1714656662&width=493',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'Safe and effective pest control derived from neem, ideal for organic farms in Mizoram.'
            },
            price: 150,
            originalPrice: 200,
            discount: 25,
            quantity: 20,
            seller: {
                name: 'BioSafe Agro',
                address: 'Aizawl, Mizoram, India',
            },
            rating: 4.7,
            ratingCount: [1, 1, 3, 8, 30],
            reviews: [
                { name: 'Vanlalruati', date: '10th Apr 2024', rating: 5, comment: 'Effective and safe for organic farming.' }
            ],
        },

        // Tools
        {
            id: 5,
            name: 'Daw (Traditional Hoe)',
            category: 'Tools',
            description: 'Traditional hoe used for weeding and land clearing in shifting cultivation.',
            imageUrls: [
                'https://5.imimg.com/data5/SELLER/Default/2024/2/384785979/OR/MW/IJ/9258799/hectare-traditional-hoe-with-3-prong-cultivator-hand-power-heavy-duty-for-loosening-soil-weeding-500x500.jpg',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'Durable and easy-to-use hoe made from high-quality metal, essential for local farming practices.'
            },
            price: 300,
            originalPrice: 350,
            discount: 14,
            quantity: 10,
            seller: {
                name: 'MizoFarm Tools',
                address: 'Serchhip, Mizoram, India',
            },
            rating: 4.9,
            ratingCount: [0, 0, 1, 5, 18],
            reviews: [
                { name: 'Lalremruata', date: '15th Jan 2024', rating: 5, comment: 'Perfect for small-scale weeding and digging.' }
            ],
        },
    ];


    const product = products.find(p => p.id === productId);

    const [wishlist, setWishlist] = useState([]);

    const handleQuantityChange = (type) => {
        setQuantity(prevQuantity =>
            type === 'inc' ? Math.min(prevQuantity + 1, product.quantity) : Math.max(1, prevQuantity - 1)
        );
    };

    const toggleWishlist = () => {
        setWishlist(prevWishlist =>
            prevWishlist.includes(productId)
                ? prevWishlist.filter(id => id !== productId)
                : [...prevWishlist, productId]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Product Images */}
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {product.imageUrls.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.productImage} />
                    ))}
                </ScrollView>

                {/* Back and Wishlist Icons */}
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.wishlistIcon} onPress={toggleWishlist}>
                    <Ionicons
                        name={wishlist.includes(productId) ? "heart" : "heart-outline"}
                        size={28}
                        color="#E53935"
                    />
                </TouchableOpacity>

                {/* Product Info Section */}
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.ratingRow}>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={product.rating}
                            style={styles.rating}
                            tintColor="#fff"
                            type="star"
                        />
                        <Text style={styles.ratingCount}>({product.ratingCount} reviews)</Text>
                    </View>
                    <View style={styles.priceSection}>
                        <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                        <Text style={styles.currentPrice}>₹{product.price}</Text>
                        <Text style={styles.discount}>{product.discount}% OFF</Text>
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
                        <Text style={styles.descriptionText}>{product.productDescription.paragraph}</Text>
                    </View>
                </View>

                {/* Seller Info Section */}
                <View style={styles.sellerInfo}>
                    <Text style={styles.sellerLabel}>Seller Information</Text>
                    <Text style={styles.sellerName}>Name: {product.seller.name}</Text>
                    <Text style={styles.sellerAddress}>Address: {product.seller.address}</Text>
                </View>

                {/* Customer Reviews Section */}
                <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
                <View style={styles.reviewSection}>
                    <ReviewComponent reviewCount={product.ratingCount} />
                    {product.reviews.map((review, index) => (
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
                    ))}
                </View>

                {/* Similar Products Section */}
                <Text style={styles.sectionTitle}>Similar Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {products.map((p, index) => (
                        <ProductCardMini key={index} product={p} />
                    ))}
                </ScrollView>
            </ScrollView>

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.buttonText}>ADD TO CART</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton} onPress={() => navigation.navigate('Cart')}>
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
        width: Dimensions.get('window').width - 30,
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
        color: '#E53935',
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