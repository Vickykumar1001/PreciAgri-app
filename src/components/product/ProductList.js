import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import ProductCardMini from './ProductCardMini';

const ProductList = ({ title, products, navigation }) => {
    return (
        <View style={styles.productList}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product) => (
                    <TouchableOpacity key={product._id} onPress={() => navigation.navigate('ProductDetail', { product })}>
                        <ProductCardMini product={product} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    productList: {
        backgroundColor: '#fff',
        marginVertical: 10,
        paddingBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    sectionTitle: {
        backgroundColor: "#fff",
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ProductList;
