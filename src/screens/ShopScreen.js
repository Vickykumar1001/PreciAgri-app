import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const ShopPage = ({ navigation, route }) => {
    const { category } = route.params || {}; // Get the passed category
    const [filteredProducts, setFilteredProducts] = useState([]);

    const allProducts = [
        { id: '1', name: 'Organic Tomatoes', category: 'Vegetables', price: '₹50/kg', image: require('../assets/images/tomatoes.png') },
        { id: '2', name: 'Fresh Mangoes', category: 'Fruits', price: '₹120/kg', image: require('../assets/images/mango.png') },
        { id: '3', name: 'Rice', category: 'Grains', price: '₹40/kg', image: require('../assets/images/grain.webp') },
        { id: '4', name: 'Milk', category: 'Dairy', price: '₹60/litre', image: require('../assets/images/dairy.png') },
    ];

    useEffect(() => {
        if (category) {
            const filtered = allProducts.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(allProducts); // Show all products if no category is selected
        }
    }, [category]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products: {category || 'All'}</Text>
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.productCard}>
                        <Image source={item.image} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>{item.price}</Text>
                    </View>
                )}
            />
            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                    <Ionicons name="home" color="#777" size={28} />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Shop')} >
                    <Ionicons name="storefront" size={28} color="#4CAF50" />
                    <Text style={styles.footerText}>Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person" size={28} color="#777" />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    productCard: { marginBottom: 15, alignItems: 'center' },
    productImage: { width: 100, height: 100, marginBottom: 10 },
    productName: { fontSize: 18, fontWeight: 'bold' },
    productPrice: { fontSize: 16, color: '#777' },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#FFF',
    },
    footerText: {
        fontSize: 14,
        color: '#777',
    },
});

export default ShopPage;
