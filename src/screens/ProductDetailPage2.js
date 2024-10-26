import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

// Dummy Product Data
const product = {
    id: 1,
    name: 'Organic Fresh Tomatoes',
    images: [
        'https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_RpV_Nq_aND67ekZG9sOso6gv4AQatx2sw&s',
    ],
    rating: 4.3,
    originalPrice: 100,
    currentPrice: 80,
    discountPercentage: 20,
    description: 'These are fresh, organic tomatoes grown locally.',
    seller: { name: 'AgriMart', address: '123 Farm Road, AgriVille' },
    reviews: [
        { id: 1, user: 'Alice', rating: 5, comment: 'Excellent quality!', date: '2024-10-01' },
        { id: 2, user: 'Bob', rating: 4, comment: 'Good but slightly overpriced.', date: '2024-10-15' },
    ],
    reviewSummary: [5, 10, 8, 3, 2], // [5★, 4★, 3★, 2★, 1★]
};

// Chart Config
const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
};

const ProductDetailPage = ({ navigation }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => alert('Added to cart!');
    const handleBuyNow = () => alert('Proceed to checkout!');

    const renderImage = ({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
    );

    const totalStars = product.reviewSummary.reduce((acc, val) => acc + val, 0);

    return (
        <ScrollView style={styles.container}>
            {/* Image Carousel */}
            <FlatList
                data={product.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderImage}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.wishlistIcon}>
                <Ionicons name="heart-outline" size={28} color="#4CAF50" />
            </TouchableOpacity>

            {/* Product Information */}
            <View style={styles.infoContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
                    <Ionicons name="star" size={20} color="#FFC107" />
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                    <Text style={styles.currentPrice}>₹{product.currentPrice}</Text>
                    <Text style={styles.discount}>{product.discountPercentage}% OFF</Text>
                </View>
            </View>

            {/* Quantity Input */}
            <View style={styles.quantityContainer}>
                <Text>Order Quantity:</Text>
                <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={String(quantity)}
                    onChangeText={(text) => setQuantity(parseInt(text) || 1)}
                />
            </View>

            {/* Description */}
            <Text style={styles.sectionHeader}>About the Product</Text>
            <Text style={styles.description}>{product.description}</Text>

            {/* Seller Information */}
            <Text style={styles.sectionHeader}>About the Seller</Text>
            <Text>{product.seller.name}</Text>
            <Text>{product.seller.address}</Text>

            {/* Reviews Summary */}
            <Text style={styles.sectionHeader}>Reviews Summary</Text>
            <PieChart
                data={[
                    { name: '5★', population: product.reviewSummary[0], color: '#4CAF50', legendFontColor: '#000', legendFontSize: 12 },
                    { name: '4★', population: product.reviewSummary[1], color: '#FFC107', legendFontColor: '#000', legendFontSize: 12 },
                    { name: '3★', population: product.reviewSummary[2], color: '#FF9800', legendFontColor: '#000', legendFontSize: 12 },
                    { name: '2★', population: product.reviewSummary[3], color: '#F44336', legendFontColor: '#000', legendFontSize: 12 },
                    { name: '1★', population: product.reviewSummary[4], color: '#9E9E9E', legendFontColor: '#000', legendFontSize: 12 },
                ]}
                width={screenWidth - 16}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            {/* Recent Reviews */}
            <Text style={styles.sectionHeader}>Recent Reviews</Text>
            {product.reviews.map((review) => (
                <View key={review.id} style={styles.reviewContainer}>
                    <Text style={styles.reviewUser}>{review.user}</Text>
                    <Text>{'⭐'.repeat(review.rating)}</Text>
                    <Text>{review.comment}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
            ))}

            {/* Footer with Add to Cart and Buy Now */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E8F5E9', padding: 8 },
    image: { width: screenWidth, height: 250, resizeMode: 'cover' },
    wishlistIcon: { position: 'absolute', top: 10, right: 10 },
    infoContainer: { padding: 8 },
    productName: { fontSize: 22, fontWeight: 'bold', color: '#4CAF50' },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    ratingText: { fontSize: 18, marginRight: 5 },
    priceContainer: { flexDirection: 'row', alignItems: 'center' },
    originalPrice: { textDecorationLine: 'line-through', marginRight: 8 },
    currentPrice: { fontSize: 20, fontWeight: 'bold', color: '#FF5722' },
    discount: { marginLeft: 8, color: '#388E3C' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    quantityInput: { borderWidth: 1, borderColor: '#ddd', padding: 5, width: 50, marginLeft: 8 },
    sectionHeader: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
    description: { marginBottom: 10 },
    reviewContainer: { marginVertical: 5 },
    reviewUser: { fontWeight: 'bold' },
    reviewDate: { color: '#757575', fontSize: 12 },
    footer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 },
    cartButton: { backgroundColor: '#FF9800', padding: 10, borderRadius: 5 },
    buyButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});
