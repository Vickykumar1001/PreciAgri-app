import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddPost() {
    const [imageUrl, setImageUrl] = useState('');
    const [brand, setBrand] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [topLevelCategory, setTopLevelCategory] = useState('');
    const [secondLevelCategory, setSecondLevelCategory] = useState('');
    const [thirdLevelCategory, setThirdLevelCategory] = useState('');
    const [sizes, setSizes] = useState([{ name: '', quantity: '', price: '', discountedPrice: '' }]);

    // Add more size inputs
    const addSize = () => {
        setSizes([...sizes, { name: '', quantity: '', price: '', discountedPrice: '' }]);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImageUrl(result.uri);
        }
    };

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const productData = {
                imageUrl,
                brand,
                title,
                description,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                discountedPrice: parseFloat(discountedPrice),
                topLevelCategory,
                secondLevelCategory,
                thirdLevelCategory,
                size: sizes.map(size => ({
                    name: size.name,
                    quantity: parseInt(size.quantity),
                    price: parseFloat(size.price),
                    discountedPrice: parseFloat(size.discountedPrice)
                }))
            };

            await axios.post("http://192.168.0.106:5454/api/admin/products", productData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert("Success", "Product added successfully!");
        } catch (error) {
            Alert.alert("Error", "Could not add product. Please try again.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Brand</Text>
            <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="Enter brand name" />

            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Product title" />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Product description" multiline />

            <Text style={styles.label}>Image URL</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : <Text>Select Image</Text>}
            </TouchableOpacity>

            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="Price" keyboardType="numeric" />

            <Text style={styles.label}>Discounted Price</Text>
            <TextInput style={styles.input} value={discountedPrice} onChangeText={setDiscountedPrice} placeholder="Discounted Price" keyboardType="numeric" />

            <Text style={styles.label}>Quantity</Text>
            <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} placeholder="Quantity" keyboardType="numeric" />

            <Text style={styles.label}>Categories</Text>
            <TextInput style={styles.input} value={topLevelCategory} onChangeText={setTopLevelCategory} placeholder="Top Level Category" />
            <TextInput style={styles.input} value={secondLevelCategory} onChangeText={setSecondLevelCategory} placeholder="Second Level Category" />
            <TextInput style={styles.input} value={thirdLevelCategory} onChangeText={setThirdLevelCategory} placeholder="Third Level Category" />

            <Text style={styles.label}>Sizes</Text>
            {sizes.map((size, index) => (
                <View key={index} style={styles.sizeContainer}>
                    <TextInput style={styles.input} placeholder="Size" value={size.name} onChangeText={value => updateSizeField(index, 'name', value)} />
                    <TextInput style={styles.input} placeholder="Quantity" value={size.quantity} onChangeText={value => updateSizeField(index, 'quantity', value)} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Price" value={size.price} onChangeText={value => updateSizeField(index, 'price', value)} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Discounted Price" value={size.discountedPrice} onChangeText={value => updateSizeField(index, 'discountedPrice', value)} keyboardType="numeric" />
                </View>
            ))}
            <TouchableOpacity onPress={addSize} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Size</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Save Product</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { fontWeight: 'bold', marginTop: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginVertical: 5 },
    imagePicker: { alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 10 },
    image: { width: 100, height: 100 },
    sizeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginVertical: 10 },
    addButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
    submitButton: { backgroundColor: 'green', padding: 15, borderRadius: 5, marginVertical: 20, alignItems: 'center' },
    submitButtonText: { color: 'white', fontWeight: 'bold' }
});
