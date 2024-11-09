import React, { useState } from 'react';
import {
    View, Text, TextInput, Image, Button, FlatList, ScrollView, TouchableOpacity, StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Banner from "../Shared/Banner"
import TopBar from '../components/TopBar';
import ProductCardMini from './ProductCardMini';
const HomePage = ({ navigation }) => {
    const [search, setSearch] = useState('');

    const categories = [
        { id: '1', name: 'Seeds', image: require('../assets/images/seed.png') },
        { id: '2', name: 'Fertilizers', image: require('../assets/images/fertilizer.png') },
        { id: '3', name: 'Pesticides', image: require('../assets/images/pesticide.png') },
        { id: '4', name: 'Irrigation', image: require('../assets/images/irrigation.png') },
        { id: '5', name: 'Tools', image: require('../assets/images/tools.png') },
        { id: '6', name: 'Machinery', image: require('../assets/images/machinery.png') },
        { id: '7', name: 'Mulch & Covering', image: require('../assets/images/mulch.png') },
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
        // Seeds and Crops
        {
            id: 1,
            name: 'SRI Rice Seeds',
            category: 'Seeds',
            description: 'System of Rice Intensification (SRI) variety, suited for Mizoram’s hilly terrains and wet climate.',
            imageUrls: [
                'https://5.imimg.com/data5/SELLER/Default/2024/3/404980651/GJ/NK/AG/33516101/sri-vardhan-999-paddy-seeds.jpg',
                'https://m.media-amazon.com/images/I/A1kOX5L0ezL._AC_UF1000,1000_QL80_.jpg',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'High-yield rice seeds ideal for terrace farming. Adapted to grow with minimal water and sustainable practices.'
            },
            price: 400,
            originalPrice: 500,
            discount: 20,
            quantity: 15,
            seller: {
                name: 'MizoAgro Seeds',
                address: 'Aizawl, Mizoram, India',
            },
            rating: 4.7,
            ratingCount: [2, 1, 5, 8, 20],
            reviews: [
                { name: 'Chhingpuii Ralte', date: '5th Jan 2024', rating: 5, comment: 'Great yield and easy to cultivate on terraced fields.' }
            ],
        },
        {
            id: 2,
            name: 'Ginger Rhizomes',
            category: 'Crops',
            description: 'High-quality ginger rhizomes, well-suited to Mizoram’s soil and climate.',
            imageUrls: [
                'https://housing.com/news/wp-content/uploads/2022/11/ginger-plant-compressed.jpg',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'Fresh ginger rhizomes ideal for high-quality production, widely used in local cuisine and medicine.'
            },
            price: 250,
            originalPrice: 300,
            discount: 17,
            quantity: 25,
            seller: {
                name: 'Hmar Organic Farms',
                address: 'Lunglei, Mizoram, India',
            },
            rating: 4.8,
            ratingCount: [1, 1, 2, 10, 30],
            reviews: [
                { name: 'Lalmuansangi', date: '20th Feb 2024', rating: 5, comment: 'Excellent quality and highly aromatic.' }
            ],
        },

        // Fertilizers
        {
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
            quantity: 30,
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
            quantity: 20,
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

        // Tools
        {
            id: 5,
            name: 'Daw (Traditional Hoe)',
            category: 'Tools',
            description: 'Traditional hoe used for weeding and land clearing in shifting cultivation.',
            imageUrls: [
                'https://5.imimg.com/data5/SELLER/Default/2024/2/384785979/OR/MW/IJ/9258799/hectare-traditional-hoe-with-3-prong-cultivator-hand-power-heavy-duty-for-loosening-soil-weeding-500x500.jpg',
            ],
            productDescription: {
                title: 'Product Overview',
                paragraph: 'Durable and easy-to-use hoe made from high-quality metal, essential for local farming practices.'
            },
            price: 300,
            originalPrice: 350,
            discount: 14,
            quantity: 10,
            seller: {
                name: 'MizoFarm Tools',
                address: 'Serchhip, Mizoram, India',
            },
            rating: 4.9,
            ratingCount: [0, 0, 1, 5, 18],
            reviews: [
                { name: 'Lalremruata', date: '15th Jan 2024', rating: 5, comment: 'Perfect for small-scale weeding and digging.' }
            ],
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
                            key={product.id}

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
                            key={product.id}
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
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person" size={28} color="#777" />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('AddPost')}>
                    <Ionicons name="cart" size={28} color="#777" />
                    <Text style={styles.footerText}>Sell</Text>
                </TouchableOpacity> */}
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
