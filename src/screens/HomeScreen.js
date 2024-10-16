import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, FlatList, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const categories = [
        { id: '1', name: 'Vegetables', image: require('../assets/images/veg.png') },
        { id: '2', name: 'Fruits', image: require('../assets/images/fruit.png') },
        { id: '3', name: 'Grains', image: require('../assets/images/grain.webp') },
        { id: '4', name: 'Dairy', image: require('../assets/images/dairy.png') },
    ];

    const featuredProducts = [
        { id: '1', name: 'Organic Tomatoes', price: '₹50/kg', image: require('../assets/images/tomatoes.png') },
        { id: '2', name: 'Fresh Mangoes', price: '₹120/kg', image: require('../assets/images/mango.png') },
    ];

    const farmers = [
        { id: '1', name: 'Farmer Ram Singh', location: 'Maharashtra' },
        { id: '2', name: 'Farmer Priya Patel', location: 'Gujarat' },
    ];

    const handleProductPress = (product) => {
        navigation.navigate('ProductDetails', { product });
    };

    return (
        <View style={styles.container}>
            {/* Top Bar with Cart Icon */}
            <View style={styles.topBar}>
                <Text style={styles.appTitle}>FarmFresh</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#777" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for fresh produce..."
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>

            <ScrollView>
                {/* Categories Section */}
                <Text style={styles.sectionTitle}>Categories</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.categoryCard}>
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
                    <Ionicons name="home-outline" size={28} color="#4CAF50" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart-outline" size={28} color="#777" />
                    <Text style={styles.footerText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person-outline" size={28} color="#777" />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    appTitle: {
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
        width: 80,
        height: 80,
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
