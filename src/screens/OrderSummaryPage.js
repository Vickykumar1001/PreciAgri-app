import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import CustomTopBar from '../components/CustomTopBar';
const OrderSummaryPage = ({ navigation, route }) => {
    const { orderItems, shippingAddress, totalPrice, totalDiscountedPrice, totalItem } = route.params.order;

    // Calculating totals
    const totalMRP = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const totalSellingPrice = orderItems.reduce(
        (sum, item) => sum + item.discountedPrice * item.quantity,
        0
    );
    const discount = totalMRP - totalSellingPrice;

    // Rendering order items
    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Image source={{ uri: item.product.imagesUrl[0] }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.product.title}</Text>
                <Text>{item.size}</Text>
                <Text style={styles.productPrice}>
                    ₹ {item.discountedPrice}
                    <Text style={styles.originalPrice}> ₹ {item.price}</Text>
                </Text>
                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
            </View>
        </View>
    );

    return (
        <>
            <CustomTopBar navigation={navigation} title={"Order Summary"} />
            <View style={styles.container}>
                <View style={styles.deliveryDetails}>
                    <Text style={styles.deliveryTitle}>Delivery Address</Text>
                    <Text style={styles.addressText}>{shippingAddress.firstName} {shippingAddress.lastName}</Text>
                    <Text style={styles.addressText}>{shippingAddress.streetAddress}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zipCode}</Text>
                    <Text style={styles.addressText}>Mobile: {shippingAddress.mobile}</Text>
                </View>
                <FlatList
                    data={orderItems}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item._id}
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

                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={() => {
                        var options = {
                            description: 'Credits towards consultation',
                            image: 'https://i.imgur.com/3g7nmJC.jpg',
                            currency: 'INR',
                            key: 'rzp_test_bCwRAS88ZwEfxA',
                            amount: '5000',
                            name: 'Acme Corp',
                            order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
                            prefill: {
                                email: 'gaurav.kumar@example.com',
                                contact: '9191919191',
                                name: 'Gaurav Kumar'
                            },
                            theme: { color: '#53a20e' }
                        }
                        console.log(RazorpayCheckout)
                        RazorpayCheckout.open(options).then((data) => {
                            // handle success
                            alert(`Success: ${data.razorpay_payment_id}`);
                        }).catch((error) => {
                            // handle failure
                            console.log(error);
                            alert(`Error: ${error.code} | ${error.description}`);
                        });
                    }}
                >
                    <Text style={styles.placeOrderButtonText}>Pay ₹{totalSellingPrice} </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2', padding: 7 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 7 },
    orderItem: { flexDirection: 'row', backgroundColor: '#fff', marginVertical: 5, padding: 10, borderRadius: 8 },
    productImage: { width: 80, height: 80, borderRadius: 8 },
    productDetails: { flex: 1, marginLeft: 10 },
    productName: { fontSize: 16, fontWeight: 'bold' },
    productDescription: { fontSize: 12, color: '#555', marginVertical: 5 },
    productPrice: { fontSize: 14, color: '#000' },
    originalPrice: { textDecorationLine: 'line-through', color: '#888' },
    productQuantity: { fontSize: 14, marginTop: 5 },
    orderSummary: { backgroundColor: '#fff', padding: 10, marginVertical: 5, borderRadius: 8 },
    summaryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    summaryText: { fontSize: 14, color: '#555' },
    grandTotalText: { fontSize: 16, fontWeight: 'bold' },
    deliveryDetails: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginVertical: 0 },
    deliveryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    addressText: { fontSize: 14, marginBottom: 5 },
    placeOrderButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
    placeOrderButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default OrderSummaryPage;
