import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, Button, FlatList, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Banner from "../Shared/Banner"
const HomePage = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const categories = [
        { id: '1', name: 'Vegetables', image: require('../assets/images/veg.png'), link: 'vegetables', },
        { id: '2', name: 'Fruits', image: require('../assets/images/fruit.png'), link: 'vegetables', },
        { id: '3', name: 'Grains', image: require('../assets/images/grain.webp'), link: 'vegetables', },
        { id: '4', name: 'Dairy', image: require('../assets/images/dairy.png'), link: 'vegetables', },
        { id: '5', name: 'Fruits', image: require('../assets/images/fruit.png'), link: 'vegetables', },
        { id: '6', name: 'Grains', image: require('../assets/images/grain.webp'), link: 'vegetables', },
        { id: '7', name: 'Dairy', image: require('../assets/images/dairy.png'), link: 'vegetables', },
    ];
    const services = [
        { id: '1', name: 'Weather', image: require('../assets/images/veg.png'), link: 'vegetables', },
        { id: '2', name: 'Loan', image: require('../assets/images/fruit.png'), link: 'vegetables', },
        { id: '3', name: 'Shop', image: require('../assets/images/grain.webp'), link: 'vegetables', },
        { id: '4', name: 'Farming Tips', image: require('../assets/images/dairy.png'), link: 'vegetables', },
        { id: '5', name: 'Fruits', image: require('../assets/images/fruit.png'), link: 'vegetables', },
        { id: '6', name: 'Grains', image: require('../assets/images/grain.webp'), link: 'vegetables', },
        { id: '7', name: 'Dairy', image: require('../assets/images/dairy.png'), link: 'vegetables', },
    ];

    const featuredProducts = [
        { id: '1', name: 'Organic Tomatoes', price: '₹50/kg', image: require('../assets/images/tomatoes.png') },
        { id: '2', name: 'Fresh Mangoes', price: '₹120/kg', image: require('../assets/images/mango.png') },
        { id: '3', name: 'Organic Tomatoes', price: '₹50/kg', image: require('../assets/images/tomatoes.png') },
        { id: '4', name: 'Fresh Mangoes', price: '₹120/kg', image: require('../assets/images/mango.png') },
        { id: '5', name: 'Organic Tomatoes', price: '₹50/kg', image: require('../assets/images/tomatoes.png') },
        { id: '6', name: 'Fresh Mangoes', price: '₹120/kg', image: require('../assets/images/mango.png') },
    ];

    const farmers = [
        { id: '1', name: 'Farmer Ram Singh', location: 'Maharashtra' },
        { id: '2', name: 'Farmer Priya Patel', location: 'Gujarat' },
    ];
    const handleCategoryPress = (category) => {
        navigation.navigate('Shop', { category: category.name });
    };
    const handleProductPress = (product) => {
        navigation.navigate('ProductDetails', { product });
    };

    return (
        <View style={styles.container}>
            {/* Top Bar with Cart Icon */}
            <View style={styles.topBar}>
                <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('search')}>
                    <Ionicons name="menu" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={[styles.appTitle, { color: '#4A90E2' }]}>Preci</Text>
                <Text style={[styles.appTitle, { color: '#4CAF50' }]}>Agri</Text>
                <View style={styles.icons}>
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('search')}>
                        <Ionicons name="search" size={28} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('notification')}>
                        <Ionicons name="notifications" size={28} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="cart" size={28} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            {/* <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#777" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for fresh produce..."
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View> */}
            <ScrollView>
                <Banner />
                {/* Categories Section */}
                <Text style={styles.sectionTitle}>Categories</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
                            <Image source={item.image} style={styles.categoryImage} />
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
                <Text style={styles.sectionTitle}>Services</Text>
                <FlatList
                    data={services}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
                            <Image source={item.image} style={styles.categoryImage} />
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />

                {/* Featured Products Section */}
                <Text style={styles.sectionTitle}>Featured Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredProducts.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            style={styles.productCard}
                            onPress={() => handleProductPress(product)}
                        >
                            <Image source={product.image} style={styles.productImage} />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={styles.sectionTitle}>Featured Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredProducts.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            style={styles.productCard}
                            onPress={() => handleProductPress(product)}
                        >
                            <Image source={product.image} style={styles.productImage} />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={styles.sectionTitle}>Farming Tips</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {featuredProducts.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            style={styles.productCard}
                            onPress={() => handleProductPress(product)}
                        >
                            <Image source={product.image} style={styles.productImage} />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Farmer Section */}
                {/* <Text style={styles.sectionTitle}>Meet the Farmers</Text>
                {farmers.map((farmer) => (
                    <View key={farmer.id} style={styles.farmerCard}>
                        <FontAwesome5 name="user" size={24} color="#4CAF50" />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.farmerName}>{farmer.name}</Text>
                            <Text style={styles.farmerLocation}>{farmer.location}</Text>
                        </View>
                    </View>
                ))} */}
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity>
                    <Ionicons name="home" size={28} onPress={() => navigation.navigate('HomePage')} color="#4CAF50" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                    <Ionicons name="storefront" size={28} color="#777" />
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
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    topBar: {
        width: '100%', // Full width
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribute space between title and icons
        alignItems: 'center', // Align items vertically
        marginBottom: 10,
        paddingHorizontal: 10, // Optional: Add some horizontal padding
    },
    icons: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    appTitle: {
        marginLeft: -70,
        marginHorizontal: 0,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryCard: {
        marginRight: 15,
        alignItems: 'center',
    },
    categoryImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginBottom: 5,
    },
    categoryName: {
        fontSize: 16,
    },
    productCard: {
        width: 150,
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        marginRight: 15,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#777',
    },
    farmerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    farmerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    farmerLocation: {
        fontSize: 14,
        color: '#777',
    },
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

export default HomePage;
