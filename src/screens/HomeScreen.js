import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import TopBar from '../components/topBar/HomeTopBar';
import FooterNavigation from '../components/FooterNavigation';
import Banner from '../components/home/Banner';
import Categories from '../components/home/Categories';
import Services from '../components/home/Services';
import ProductList from '../components/product/ProductList';
import customFetch from '../utils/axios';

const HomePage = ({ navigation }) => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        // Fetch all products for different sections
        const fetchProducts = async () => {
            try {
                const response = await customFetch.get('/products/searchProducts/search?query= &limit=15');
                if (response.status === 200) {
                    setAllProducts(response.data.products);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <TopBar navigation={navigation} />
            <View style={styles.container}>
                <ScrollView>
                    <Banner />
                    <Categories navigation={navigation} />
                    <Services navigation={navigation} />
                    <ProductList title="📌 Featured Products" products={allProducts} navigation={navigation} />
                    <ProductList title="🔥 Most selling product" products={allProducts} navigation={navigation} />
                    <ProductList title="🆕 New Arrivals" products={allProducts} navigation={navigation} />
                    <ProductList title="🎯 Deals & Discounts" products={allProducts} navigation={navigation} />
                    <ProductList title="🔄 Continue Your Search.." products={allProducts} navigation={navigation} />
                </ScrollView>
                <FooterNavigation navigation={navigation} activePage="Home" />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default HomePage;
