import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProductFilterSort = ({ products, setFilteredProducts }) => {
    const [sortOption, setSortOption] = useState('default');

    // Update sorted products based on the selected sort option
    useEffect(() => {
        let sortedProducts = [...products]; // Create a copy of the products array

        // Sort the products based on the selected sort option
        if (sortOption === 'priceAsc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceDesc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'nameAsc') {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'nameDesc') {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(sortedProducts);
    }, [sortOption, products, setFilteredProducts]);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={sortOption}
                onValueChange={(itemValue) => setSortOption(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Sort By" value="default" />
                <Picker.Item label="Price: Low to High" value="priceAsc" />
                <Picker.Item label="Price: High to Low" value="priceDesc" />
                <Picker.Item label="Name: A to Z" value="nameAsc" />
                <Picker.Item label="Name: Z to A" value="nameDesc" />
            </Picker>
        </View>
    );
};

// Basic styles
const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default ProductFilterSort;
