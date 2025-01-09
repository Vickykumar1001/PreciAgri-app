import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, Button, FlatList, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Banner from "../Shared/Banner"
import TopBar from '../components/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCardMini from './ProductCardMini';
import { useEffect } from 'react';
import axios from 'axios';
const HomePage = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const [role, setRole] = useState(null);
    const [allProducts, setProducts] = useState([]);

    useEffect(() => {
        // Async function to fetch role and products
        const fetchData = async () => {
            try {
                // Retrieve role from AsyncStorage
                const storedRole = await AsyncStorage.getItem('role');
                if (storedRole !== null) {
                    setRole(storedRole); // Set the role state
                }

                // Retrieve token from AsyncStorage for the API request
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    // If token is available, fetch products from the API
                    const response = await axios.get('http://192.168.158.195:5454/api/products', {
                        headers: {
                            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                        },
                    });
                    setProducts(response.data.content); // Set the products in state
                } else {
                    setError('Token not found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            }
        };

        fetchData(); // Call the async function to fetch role and products
    }, []);
    const categories = [
        { id: '1', name: 'Seeds', image: require('../assets/images/seed.png') },
        { id: '2', name: 'Fertilizer', image: require('../assets/images/fertilizer.png') },
        { id: '3', name: 'Pesticide', image: require('../assets/images/pesticide.png') },
        { id: '4', name: 'Irrigation', image: require('../assets/images/irrigation.png') },
        { id: '5', name: 'Tools', image: require('../assets/images/tools.png') },
        { id: '6', name: 'Machinery', image: require('../assets/images/machinery.png') },
        { id: '7', name: 'Mulch & Covering', image: require('../assets/images/mulch.png') },
    ];

    const services = [
        { id: '1', name: 'Weather', image: require('../assets/images/weather.png') },
        { id: '2', name: 'Loans ', image: require('../assets/images/loan.png') },
        { id: '5', name: 'Shop', image: require('../assets/images/shop.png') },
        { id: '7', name: 'FarmingTips', image: require('../assets/images/tips.png') },
        { id: '3', name: 'Market-price', image: require('../assets/images/market.png') },
        // { id: '4', name: 'Crop Insurance', image: require('../assets/images/insurance.png') },
        // { id: '9', name: 'Soil Testing', image: require('../assets/images/soil.png') },
    ];

    const farmers = [
        { id: '1', name: 'Farmer Ram Singh', location: 'Maharashtra' },
        { id: '2', name: 'Farmer Priya Patel', location: 'Gujarat' },
    ];
    const handleCategoryPress = (category) => {
        if (category.name === 'Weather') {
            navigation.navigate('Weather');
            return;
        }
        if (category.name === 'FarmingTips') {

            navigation.navigate('FarmingTips');
            return;
        }
        navigation.navigate('Shop', { category: category.name });
    };
    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    return (
        <View style={styles.container}>
            {/* Top Bar with Cart Icon */}
            {/* <View style={styles.topBar}>
                <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.openDrawer()}>
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
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('Wishlist')}>
                        <Ionicons name="heart" size={28} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="cart" size={28} color="#333" />
                    </TouchableOpacity>
                </View>
            </View> */}
            <TopBar navigation={navigation} />

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
                    style={styles.iconList}
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
                    style={styles.iconList}
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
                    {allProducts.map((product) => (
                        <TouchableOpacity
                            key={product._id}

                            onPress={() => handleProductPress(product)}
                        >
                            <ProductCardMini navigation={navigation} product={product} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={styles.sectionTitle}>Most Selling Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {allProducts.map((product) => (
                        <TouchableOpacity
                            key={product._id}
                            onPress={() => handleProductPress(product)}
                        >
                            <ProductCardMini navigation={navigation} product={product} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* <Text style={styles.sectionTitle}>Farming Tips</Text>
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
                </ScrollView> */}

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
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('HomePage')}  >
                    <Ionicons name="home" size={28} color="#4CAF50" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('Shop', { category: '' })}>
                    <Ionicons name="storefront" size={28} color="#777" />
                    <Text style={styles.footerText}>Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('Category')}>
                    <Ionicons name="grid" size={28} color="#777" />
                    <Text style={styles.footerText}>Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person" size={28} color="#777" />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
                {
                    role === 'Seller' && <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('AddPost')}>
                        <Ionicons name="cart" size={28} color="#777" />
                        <Text style={styles.footerText}>Sell</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('News')}>
                    <Ionicons name="newspaper" size={28} color="#777" />
                    <Text style={styles.footerText}>Article</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 5,
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
        marginTop: 15,
        paddingLeft: 8,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    iconList: {
        backgroundColor: '#F0FDF0',
        paddingVertical: 14,
    },
    categoryCard: {
        width: 95,
        marginRight: 15,
        alignItems: 'center',
        backgroundColor: "#DAF9DA",
        paddingHorizontal: 3,
        paddingVertical: 7,
        borderRadius: 15,
    },
    categoryImage: {
        width: 45,
        height: 45,
        borderRadius: 8,
        marginBottom: 5,
    },
    categoryName: {
        fontSize: 15,
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
