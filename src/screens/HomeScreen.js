import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, Button, FlatList, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Banner from "../Shared/Banner"
import TopBar from '../components/TopBar';
import ProductCardMini from './ProductCardMini';
const HomePage = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const categories = [
        { id: '1', name: 'Vegetables', image: require('../assets/images/veg.png'), },
        { id: '2', name: 'Fruits', image: require('../assets/images/fruit.png'), },
        { id: '3', name: 'Grains', image: require('../assets/images/grain.webp'), },
        { id: '4', name: 'Seeds', image: require('../assets/images/seed.png'), },
        { id: '5', name: 'Fertilizers', image: require('../assets/images/fertilizer.png'), },
        { id: '6', name: 'Pesticides', image: require('../assets/images/pesticide.png'), },
    ];
    const services = [
        { id: '1', name: 'Weather', image: require('../assets/images/weather.png') },
        { id: '2', name: 'Loans ', image: require('../assets/images/loan.png') },
        { id: '3', name: 'Market-price', image: require('../assets/images/market.png') },
        { id: '4', name: 'Crop Insurance', image: require('../assets/images/insurance.png') },
        { id: '5', name: 'Shop', image: require('../assets/images/shop.png') },
        { id: '7', name: 'Farming Tips', image: require('../assets/images/tips.png') },
        { id: '9', name: 'Soil Testing', image: require('../assets/images/soil.png') },
    ];


    const allProducts = [
        {
            id: '1',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQENlWkwP3PHLtWQo4RiBg5r_cUCqCCw-bH1w&s',
            name: 'Fresh Tomatoes',
            rating: 4.7,
            reviews: 120,
            currentPrice: 60,
            originalPrice: 80,
            category: 'vegetables',
        },
        {
            id: '2',
            image: 'https://cdn.pixabay.com/photo/2017/09/26/13/21/apples-2788599_1280.jpg',
            name: 'Apples (1 Kg)',
            rating: 4.5,
            reviews: 92,
            currentPrice: 180,
            originalPrice: 220,
            category: 'fruits',
        },
        {
            id: '3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSrCZTZcv8qCqHOIpl9VEw9B4VvD2XFL4Tg&s',
            name: 'Basmati Rice (5 Kg)',
            rating: 4.3,
            reviews: 48,
            currentPrice: 500,
            originalPrice: 600,
            category: 'grains',
        },
        {
            id: '4',
            image: 'https://m.media-amazon.com/images/I/71xuH19n5YL._AC_UF1000,1000_QL80_.jpg',
            name: 'Wheat Seeds (2 Kg)',
            rating: 4.6,
            reviews: 66,
            currentPrice: 350,
            originalPrice: 400,
            category: 'seeds',
        },
        {
            id: '5',
            image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg',
            name: 'Bananas (Dozen)',
            rating: 4.8,
            reviews: 110,
            currentPrice: 50,
            originalPrice: 70,
            category: 'fruits',
        },
        {
            id: '6',
            image: 'https://www.purepunjabi.co.uk/wp-content/uploads/2017/01/Chickpeas.png',
            name: 'Chickpeas (1 Kg)',
            rating: 4.2,
            reviews: 35,
            currentPrice: 120,
            originalPrice: 150,
            category: 'grains',
        },
        {
            id: '7',
            image: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg',
            name: 'Potatoes (2 Kg)',
            rating: 4.5,
            reviews: 78,
            currentPrice: 50,
            originalPrice: 70,
            category: 'vegetables',
        },
        {
            id: '8',
            image: 'https://static.wixstatic.com/media/5f378b_cfc7fbfd9df74b8aae0393776b9416f4~mv2.jpg',
            name: 'Sunflower Seeds (1 Kg)',
            rating: 4.3,
            reviews: 28,
            currentPrice: 200,
            originalPrice: 250,
            category: 'seeds',
        },
    ];

    const farmers = [
        { id: '1', name: 'Farmer Ram Singh', location: 'Maharashtra' },
        { id: '2', name: 'Farmer Priya Patel', location: 'Gujarat' },
    ];
    const handleCategoryPress = (category) => {
        console.log(category)
        if (category.name === 'Weather') {

            navigation.navigate('Weather');
            return
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
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('wishlist')}>
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
                            key={product.id}

                            onPress={() => handleProductPress(product)}
                        >
                            <ProductCardMini product={product} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={styles.sectionTitle}>Most Selling Products</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {allProducts.map((product) => (
                        <TouchableOpacity
                            key={product.id}
                            onPress={() => handleProductPress(product)}
                        >
                            <ProductCardMini product={product} />
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
                <TouchableOpacity>
                    <Ionicons name="home" size={28} onPress={() => navigation.navigate('HomePage')} color="#4CAF50" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Shop', { category: '' })}>
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
