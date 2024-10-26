import React, { useState } from 'react';
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
import { BarChart } from 'react-native-chart-kit';
import ReviewComponent from '../components/Review';
// Dummy product data
const product = {
    name: 'V Hume - Bio-Stimulant',
    description: 'Acts as a Conditioner for the Soil and Bio-Stimulant for Plants, improves PH of soil.',
    imageUrls: [
        'https://cdn.britannica.com/16/187216-131-FB186228/tomatoes-tomato-plant-Fruit-vegetable.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_RpV_Nq_aND67ekZG9sOso6gv4AQatx2sw&s',
    ],
    price: 1120,
    originalPrice: 1250,
    discount: 10,
    quantity: 1,
    seller: { name: 'Agri Store', address: '123 Green Street, India' },
    rating: 3.5,
    reviews: [
        { name: 'Manju Nath', date: '6th Aug 2021', rating: 5, comment: 'Helpful product for plant growth' },
        { name: 'Vrajraj Ji', date: '23rd July 2021', rating: 5, comment: 'Excellent natural and organic' },
        { name: 'Paresh', date: '4th Sep 2019', rating: 5, comment: 'Best product for growth' },
    ],
};

const ProductDetailScreen = () => {
    const [quantity, setQuantity] = useState(product.quantity);

    const handleQuantityChange = (type) => {
        setQuantity((prev) => (type === 'inc' ? prev + 1 : Math.max(1, prev - 1)));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Product Image Section */}
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {product.imageUrls.map((url, index) => (
                    <Image key={index} source={{ uri: url }} style={styles.productImage} />
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.wishlistIcon}>
                <Icon name="heart" type="feather" color="red" />
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
                    <TouchableOpacity onPress={() => handleQuantityChange('dec')}>
                        <Icon name="minus" type="feather" />
                    </TouchableOpacity>
                    <TextInput value={String(quantity)} style={styles.quantityInput} editable={false} />
                    <TouchableOpacity onPress={() => handleQuantityChange('inc')}>
                        <Icon name="plus" type="feather" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Seller Info */}
            <View style={styles.sellerInfo}>
                <Text>Seller: {product.seller.name}</Text>
                <Text>Address: {product.seller.address}</Text>
            </View>

            {/* Ratings Chart */}
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            <ReviewComponent />
            {/* <BarChart
                data={{
                    labels: ['1★', '2★', '3★', '4★', '5★'],
                    datasets: [{ data: [0, 0, 0, 0, product.reviews.length] }],
                }}
                width={Dimensions.get('window').width - 30}
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
            /> */}

            {/* Reviews List */}
            {product.reviews.map((review, index) => (
                <View key={index} style={styles.reviewCard}>
                    <Rating imageSize={15} readonly startingValue={review.rating} />
                    <Text style={styles.reviewDate}>{review.date}</Text>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <Text>{review.comment}</Text>
                </View>
            ))}

            {/* Footer Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.buttonText}>ADD TO CART</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton}>
                    <Text style={styles.buttonText}>BUY NOW</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    productImage: { width: Dimensions.get('window').width, height: 300, resizeMode: 'contain' },
    wishlistIcon: { position: 'absolute', top: 20, right: 10 },
    productInfo: { padding: 16 },
    productName: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    priceSection: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    originalPrice: { textDecorationLine: 'line-through', marginRight: 8 },
    currentPrice: { fontSize: 18, fontWeight: 'bold', marginRight: 8 },
    discount: { color: 'green' },
    quantitySection: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
    quantityInput: { borderWidth: 1, padding: 4, width: 40, textAlign: 'center' },
    sellerInfo: { padding: 16, backgroundColor: '#fff', marginTop: 8 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', margin: 16 },
    reviewCard: { padding: 16, backgroundColor: '#fff', marginVertical: 4 },
    reviewDate: { fontSize: 12, color: 'gray' },
    reviewerName: { fontWeight: 'bold', marginVertical: 4 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
    addToCartButton: { backgroundColor: 'green', padding: 16, borderRadius: 8, flex: 1, marginRight: 8 },
    buyNowButton: { backgroundColor: 'orange', padding: 16, borderRadius: 8, flex: 1 },
    buttonText: { color: '#fff', textAlign: 'center' },
});

export default ProductDetailScreen;
