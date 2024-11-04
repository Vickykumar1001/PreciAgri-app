import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const WishlistTopBar = ({ navigation, setCategory }) => {
    const [searchText, setSearchText] = useState('');
    const handleSearch = (text) => {
        setSearchText(text);
        setCategory(text); // Update category state in ShopPage
    };
    return (
        <View style={styles.topBar}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="#333" />
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>
                My WishList
            </Text>
            {/* Search Input Field
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#333" style={{ marginHorizontal: 5 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for items..."
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholderTextColor="#999"
                />
            </View> */}

            {/* Action Icons */}
            <View style={styles.icons}>
                {/* <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('Wishlist')}>
                    <Ionicons name="heart" size={28} color="#333" />
                </TouchableOpacity> */}
                <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart" size={28} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WishlistTopBar;

const styles = StyleSheet.create({
    topBar: {
        width: '100%', // Full width
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Align items vertically
        justifyContent: 'space-between', // Space between back button, search input, and icons
        padding: 5,
        backgroundColor: '#FFFFFF', // Set background color to white
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchContainer: {
        flex: 1, // Allow search input to take available space
        flexDirection: 'row', // Align search icon and input horizontally
        alignItems: 'center', // Center vertically
        backgroundColor: '#F0F0F0', // Light background for input field
        borderRadius: 8,
        paddingHorizontal: 5,
        marginHorizontal: 10, // Space around search field
    },
    searchInput: {
        flex: 1, // Input field should take all remaining space
        height: 40,
        fontSize: 16,
        color: '#333', // Text color
    },
    icons: {
        flexDirection: 'row', // Arrange icons in a row
        alignItems: 'center', // Align icons vertically
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
