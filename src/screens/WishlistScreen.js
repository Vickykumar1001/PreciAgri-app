import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard2'; // Reuse ProductCard for consistency
import WishlistTopBar from '../components/WishListTopBar';
import ProductCardWishlist from './ProductCardWishlist';

const ShopPage = ({ navigation, route }) => {
    const [category, setCategory] = useState(route.params);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]); // Track wishlist
    const allProducts = [
        {
            id: 1,
            name: 'SRI Rice Seeds',
            category: 'Seeds',
            description: 'System of Rice Intensification (SRI) variety, suited for Mizoram’s hilly terrains and wet climate.',
            imageUrls: [
                'https://5.imimg.com/data5/SELLER/Default/2024/3/404980651/GJ/NK/AG/33516101/sri-vardhan-999-paddy-seeds.jpg',
                'https://m.media-amazon.com/images/I/A1kOX5L0ezL._AC_UF1000,1000_QL80_.jpg',
            ],
            price: 400,
            originalPrice: 500,
            discount: 20,
            rating: 4.7,
            seller: { name: 'MizoAgro Seeds', address: 'Aizawl, Mizoram, India' },
        },
        {
            id: 2,
            name: 'Ginger Rhizomes',
            category: 'Crops',
            description: 'High-quality ginger rhizomes, well-suited to Mizoram’s soil and climate.',
            imageUrls: ['https://housing.com/news/wp-content/uploads/2022/11/ginger-plant-compressed.jpg'],
            price: 250,
            originalPrice: 300,
            discount: 17,
            rating: 4.8,
            seller: { name: 'Hmar Organic Farms', address: 'Lunglei, Mizoram, India' },
        },
        {
            id: 3,
            name: 'Organic Compost Fertilizer',
            category: 'Fertilizers',
            description: 'Compost fertilizer ideal for organic farming in Mizoram.',
            imageUrls: [
                'https://nurserylive.com/cdn/shop/products/nurserylive-g-soil-and-fertilizers-polestar-organic-food-waste-compost-1-kg-set-of-2_512x512.jpg?v=1634226541',
            ],
            price: 200,
            originalPrice: 250,
            discount: 20,
            rating: 4.6,
            seller: { name: 'EcoMizo Fertilizers', address: 'Champhai, Mizoram, India' },
        },
        {
            id: 4,
            name: 'Neem-Based Organic Pesticide',
            category: 'Pesticides',
            description: 'Eco-friendly neem-based pesticide to keep crops pest-free without harming the soil.',
            imageUrls: [
                'https://krishisevakendra.in/cdn/shop/files/Dr.neem300.webp?v=1714656662&width=493',
            ],
            price: 150,
            originalPrice: 200,
            discount: 25,
            rating: 4.7,
            seller: { name: 'BioSafe Agro', address: 'Aizawl, Mizoram, India' },
        },
        // {
        //     id: 5,
        //     name: 'Daw (Traditional Hoe)',
        //     category: 'Tools',
        //     description: 'Traditional hoe used for weeding and land clearing in shifting cultivation.',
        //     imageUrls: [
        //         'https://5.imimg.com/data5/SELLER/Default/2024/2/384785979/OR/MW/IJ/9258799/hectare-traditional-hoe-with-3-prong-cultivator-hand-power-heavy-duty-for-loosening-soil-weeding-500x500.jpg',
        //     ],
        //     price: 300,
        //     originalPrice: 350,
        //     discount: 14,
        //     rating: 4.9,
        //     seller: { name: 'MizoFarm Tools', address: 'Serchhip, Mizoram, India' },
        // },
    ];

    // Filter products based on the selected category
    useEffect(() => {
        const filtered = category
            ? allProducts.filter(
                (product) =>
                    product.name.toLowerCase().includes(category.toLowerCase()) ||
                    product.category.toLowerCase() === category.toLowerCase()
            )
            : allProducts;
        setFilteredProducts(filtered);
    }, [category]);

    // Toggle product in/out of wishlist
    const toggleWishlist = (productId) => {
        setWishlist((prevWishlist) =>
            prevWishlist.includes(productId)
                ? prevWishlist.filter((id) => id !== productId)
                : [...prevWishlist, productId]
        );
    };

    // Check if product is in wishlist
    const isInWishlist = useCallback(
        (productId) => wishlist.includes(productId),
        [wishlist]
    );

    // Memoized ProductCard for better performance
    const MemoizedProductCard = memo(({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
            <ProductCardWishlist product={item} />
        </TouchableOpacity>
    ));

    return (
        <View style={styles.container}>
            <WishlistTopBar navigation={navigation} />
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MemoizedProductCard item={item} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

// FooterButton Component to simplify footer UI
const FooterButton = ({ icon, label, onPress, isActive }) => (
    <TouchableOpacity onPress={onPress} style={styles.footerButton}>
        <Ionicons name={icon} size={28} color={isActive ? '#4CAF50' : '#777'} />
        <Text style={[styles.footerText, isActive && { color: '#4CAF50' }]}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    row: { justifyContent: 'space-evenly', margin: 0 },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    footerButton: { alignItems: 'center' },
    footerText: { fontSize: 14, color: '#777', marginTop: 4 },
});

export default ShopPage;
