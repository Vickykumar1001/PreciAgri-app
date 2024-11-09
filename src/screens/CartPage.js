import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import CartTopBar from '../components/CartTopBar';

const CartPage = ({ navigation }) => {
    // This should be the updated product data, assuming the cartItems are same as the products initially
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'SRI Rice Seeds',
            category: 'Seeds',
            description: 'System of Rice Intensification (SRI) variety, suited for Mizoram’s hilly terrains and wet climate.',
            imageUrls: [
                'https://5.imimg.com/data5/SELLER/Default/2024/3/404980651/GJ/NK/AG/33516101/sri-vardhan-999-paddy-seeds.jpg',
            ],
            price: 400,
            originalPrice: 500,
            discount: 20,
            quantity: 2,
            seller: { name: 'MizoAgro Seeds', address: 'Aizawl, Mizoram, India' },
            rating: 4.7,
            ratingCount: [2, 1, 5, 8, 20],
        }, {
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
            quantity: 5,
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
            quantity: 2,
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
    ]);

    // Calculating totals and discount
    const totalMRP = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const totalSellingPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = totalMRP - totalSellingPrice;

    // Increase and decrease quantity logic
    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Rendering cart items
    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrls[0] }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                    ₹ {item.price} <Text style={styles.originalPrice}>₹ {item.originalPrice}</Text>
                </Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeButton}>
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <CartTopBar navigation={navigation} />
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <Text style={styles.savingsText}>
                        You save a total of ₹ {discount} on this order
                    </Text>
                }
            />
            <View style={styles.orderSummary}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Total MRP</Text>
                    <Text style={styles.summaryText}>₹ {totalMRP}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Discount</Text>
                    <Text style={styles.summaryText}>₹ {discount}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Total Selling Price</Text>
                    <Text style={styles.summaryText}>₹ {totalSellingPrice}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Shipping Charges</Text>
                    <Text style={styles.summaryText}>₹ 0.00</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.grandTotalText}>Grand Total</Text>
                    <Text style={styles.grandTotalText}>₹ {totalSellingPrice}</Text>
                </View>
            </View>
            <View style={styles.checkoutContainer}>
                <Text style={styles.totalAmountText}>₹ {totalSellingPrice}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('AddAddress')}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // Styles remain the same as provided in your original code
    container: { flex: 1, backgroundColor: '#f2f2f2', marginTop: 10, marginHorizontal: 10 },
    cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginVertical: 5, borderRadius: 8 },
    productImage: { width: 80, height: 80, borderRadius: 8 },
    productDetails: { flex: 1, marginLeft: 10 },
    productName: { fontSize: 16, fontWeight: 'bold' },
    productPrice: { fontSize: 14, color: '#000' },
    originalPrice: { textDecorationLine: 'line-through', color: '#888' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
    quantityButton: { borderWidth: 1, borderColor: '#888', borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2 },
    quantityButtonText: { fontSize: 16 },
    quantityText: { marginHorizontal: 8 },
    removeButton: { marginLeft: 10 },
    removeText: { color: '#ff3300', fontSize: 14 },
    orderSummary: { backgroundColor: '#fff', padding: 15, marginTop: 10, borderRadius: 8 },
    summaryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    summaryText: { fontSize: 14, color: '#555' },
    grandTotalText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
    checkoutContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' },
    totalAmountText: { fontSize: 18, fontWeight: 'bold', color: '#000', flex: 1 },
    checkoutButton: { backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CartPage;
