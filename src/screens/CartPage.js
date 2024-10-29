import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import CartTopBar from '../components/CartTopBar';
const CartPage = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENlWkwP3PHLtWQo4RiBg5r_cUCqCCw-bH1w&s',
            name: 'Fresh Tomatoes',
            currentPrice: 60,
            originalPrice: 80,
            quantity: 2,
            size: '1 Kg',
        },
        {
            id: '2',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENlWkwP3PHLtWQo4RiBg5r_cUCqCCw-bH1w&s',
            name: 'Asataf',
            currentPrice: 275,
            originalPrice: 384,
            quantity: 1,
            size: '250 Gm',
        },
        {
            id: '3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENlWkwP3PHLtWQo4RiBg5r_cUCqCCw-bH1w&s',
            name: 'Fresh Tomatoes',
            currentPrice: 60,
            originalPrice: 80,
            quantity: 2,
            size: '1 Kg',
        },
        {
            id: '4',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENlWkwP3PHLtWQo4RiBg5r_cUCqCCw-bH1w&s',
            name: 'Asataf',
            currentPrice: 275,
            originalPrice: 384,
            quantity: 1,
            size: '250 Gm',
        },
    ]);

    const totalMRP = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const totalSellingPrice = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0);
    const discount = totalMRP - totalSellingPrice;

    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const renderItem = ({ item }) => (

        <View style={styles.cartItem}>

            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>₹ {item.currentPrice.toFixed(2)} <Text style={styles.originalPrice}>₹ {item.originalPrice.toFixed(2)}</Text></Text>
                <Text style={styles.productSize}>Size: {item.size}</Text>
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
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <Text style={styles.savingsText}>
                        You save a total of ₹ {discount.toFixed(2)} on this order
                    </Text>
                }
            />
            <View style={styles.orderSummary}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Total MRP</Text>
                    <Text style={styles.summaryText}>₹ {totalMRP.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Discount</Text>
                    <Text style={styles.summaryText}>₹ {discount.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Total Selling Price</Text>
                    <Text style={styles.summaryText}>₹ {totalSellingPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Coupon Discount</Text>
                    <Text style={styles.summaryText}>₹ 0.00</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Shipping Charges</Text>
                    <Text style={styles.summaryText}>₹ 0.00</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.grandTotalText}>Grand Total</Text>
                    <Text style={styles.grandTotalText}>₹ {totalSellingPrice.toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.checkoutContainer}>
                <Text style={styles.totalAmountText}>₹ {totalSellingPrice.toFixed(2)}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('AddAddress')}>
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    savingsText: {
        color: 'green',
        fontSize: 14,
        textAlign: 'center',
        padding: 8,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#000',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    productSize: {
        fontSize: 12,
        color: '#888',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    quantityButtonText: {
        fontSize: 16,
    },
    quantityText: {
        marginHorizontal: 8,
    },
    removeButton: {
        marginLeft: 10,
    },
    removeText: {
        color: '#ff3300',
        fontSize: 14,
    },
    orderSummary: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 10,
        borderRadius: 8,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    summaryText: {
        fontSize: 14,
        color: '#555',
    },
    grandTotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    checkoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalAmountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartPage;
