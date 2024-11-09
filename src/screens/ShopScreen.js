import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from './ProductCard2';
import { Picker } from '@react-native-picker/picker';
import SearchTopBar from '../components/SearchTopBar';

const ShopPage = ({ navigation, route }) => {
    const [category, setCategory] = useState(route.params?.category || '');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const inputRef = useRef(null);

    const { focusInput } = route.params || {};

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
    ];

    // Focus input field if focusInput is true
    useEffect(() => {
        if (focusInput) {
            const timeout = setTimeout(() => inputRef.current?.focus(), 300);
            return () => clearTimeout(timeout);
        }
    }, [focusInput]);

    // Filter products based on the selected category
    const filterProducts = useCallback(() => {
        let filtered = allProducts;

        if (category) {
            filtered = allProducts.filter(
                (product) =>
                    product.category.toLowerCase().includes(category.toLowerCase()) ||
                    product.name.toLowerCase().includes(category.toLowerCase())
            );
        }

        // Apply sorting
        if (sortOption === 'priceHighToLow') {
            filtered.sort((a, b) => b.currentPrice - a.currentPrice);
        } else if (sortOption === 'priceLowToHigh') {
            filtered.sort((a, b) => a.currentPrice - b.currentPrice);
        } else if (sortOption === 'popularity') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(filtered);
    }, [category, sortOption]);

    // Trigger filtering whenever category or sort option changes
    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    const toggleWishlist = (productId) => {
        setWishlist((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    };

    const MemoizedProductCard = memo(({ item }) => (
        <ProductCard
            navigation={navigation}
            product={item}
            isInWishlist={wishlist.includes(item.id)}
            toggleWishlist={() => toggleWishlist(item.id)}
        />
    ));

    return (
        <View style={styles.container}>
            <SearchTopBar navigation={navigation} setCategory={setCategory} inputRef={inputRef} />

            <View style={styles.sortFilterContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowSortDropdown((prev) => !prev)}
                >
                    <Text style={styles.buttonText}>Sort</Text>
                    <Ionicons name="caret-down" size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Filter button pressed')}
                >
                    <Text style={styles.buttonText}>Filter</Text>
                    <Ionicons name="filter" size={20} />
                </TouchableOpacity>
            </View>

            {showSortDropdown && (
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={sortOption}
                        onValueChange={(value) => {
                            setSortOption(value);
                            setShowSortDropdown(false);
                        }}
                    >
                        <Picker.Item label="Relevance" value="relevance" />
                        <Picker.Item label="Popularity" value="popularity" />
                        <Picker.Item label="Price (High to Low)" value="priceHighToLow" />
                        <Picker.Item label="Price (Low to High)" value="priceLowToHigh" />
                    </Picker>
                </View>
            )}

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MemoizedProductCard item={item} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
                ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 5, backgroundColor: '#f5f5f5' },
    row: { justifyContent: 'space-evenly', marginVertical: 5 },
    sortFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    buttonText: { color: '#fff', fontSize: 16, marginRight: 5 },
    pickerContainer: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 3,
    },
    emptyText: { textAlign: 'center', marginTop: 20, fontSize: 18, color: '#777' },
});

export default ShopPage;
