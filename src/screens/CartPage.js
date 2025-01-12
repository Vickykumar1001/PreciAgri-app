import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import CustomTopBar from '../components/CustomTopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const CartPage = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalMRP, setTotalMRP] = useState(0);
    const [totalSellingPrice, setTotalSellingPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    // Fetching data from the API
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`http://192.168.198.195:5454/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });
                const data = response.data;
                console.log('Cart data fetched:', data);
                const updatedCartItems = data.cartItems.map((item) => ({
                    id: item._id,
                    name: item.product.title,
                    description: item.product.description,
                    brand: item.product.brand,
                    imageUrls: item.product.imagesUrl,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.discountedPrice,
                    originalPrice: item.price,
                }));

                setCartItems(updatedCartItems);

                // Calculate totals
                const totalMRP = updatedCartItems.reduce(
                    (sum, item) => sum + item.originalPrice * item.quantity,
                    0
                );
                const totalSellingPrice = updatedCartItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                );
                const discount = totalMRP - totalSellingPrice;

                setTotalMRP(totalMRP);
                setTotalSellingPrice(totalSellingPrice);
                setDiscount(discount);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, []);

    const updateQuantityAPI = async (id, newQuantity) => {
        const token = await AsyncStorage.getItem('token'); // Retrieve the token

        try {
            // Send PUT request to update the quantity
            await axios.put(
                `http://192.168.198.195:5454/api/cart_items/${id}`,
                { quantity: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                }
            );

            console.log('Quantity updated successfully');
        } catch (error) {
            console.error('Error while updating quantity:', error.message);
        }
    };
    const updateCartDetails = () => {
        setCartItems((updatedCartItems) => {
            const totalMRP = updatedCartItems.reduce(
                (sum, item) => sum + item.originalPrice * item.quantity,
                0
            );
            const totalSellingPrice = updatedCartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            const discount = totalMRP - totalSellingPrice;

            setTotalMRP(totalMRP);
            setTotalSellingPrice(totalSellingPrice);
            setDiscount(discount);

            return updatedCartItems;
        });
    };

    // Increase quantity and send update to the API
    const increaseQuantity = async (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const updatedQuantity = item.quantity + 1;
                    updateQuantityAPI(id, updatedQuantity); // Call API to update quantity
                    return { ...item, quantity: updatedQuantity };
                }
                return item;
            })
        );

        updateCartDetails();
    };

    // Decrease quantity and send update to the API
    const decreaseQuantity = async (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id && item.quantity > 1) {
                    const updatedQuantity = item.quantity - 1;
                    updateQuantityAPI(id, updatedQuantity); // Call API to update quantity
                    return { ...item, quantity: updatedQuantity };
                }
                return item;
            })
        );

        updateCartDetails();
    };

    const removeItem = async (id) => {
        const token = await AsyncStorage.getItem('token'); // Replace with your token retrieval logic

        try {
            await axios.delete(`http://192.168.198.195:5454/api/cart_items/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the cart state after successful deletion
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error while deleting the item:', error.message);
        }
    };

    // Rendering cart items
    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrls[0] }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.discountText}> {item.size}</Text>
                <Text style={styles.productPrice}>
                    ₹ {item.price}{' '}
                    <Text style={styles.originalPrice}>₹ {item.originalPrice}</Text>

                </Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => decreaseQuantity(item.id)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => increaseQuantity(item.id)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => removeItem(item.id)}
                        style={styles.removeButton}
                    >
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <><CustomTopBar navigation={navigation} title={"My Cart"} />
            <View style={styles.container}>

                <FlatList
                    data={cartItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
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
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => navigation.navigate('SelectAddress')}
                    >
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    // Styles remain the same as provided in your original code
    savingsText: { color: 'green' },
    container: { flex: 1, backgroundColor: '#f2f2f2', marginTop: 10, },
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
