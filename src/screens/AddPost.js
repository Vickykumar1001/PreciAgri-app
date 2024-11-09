import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddPost() {
    const [imagesUrl, setImagesUrl] = useState([""]);
    const [brand, setBrand] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [topLevelCategory, setTopLevelCategory] = useState('');
    const [secondLevelCategory, setSecondLevelCategory] = useState('');
    const [thirdLevelCategory, setThirdLevelCategory] = useState('');
    const [sizes, setSizes] = useState([{ name: '', quantity: '', price: '', discountedPrice: '', discountPercent: '' }]);

    const addSize = () => {
        setSizes([...sizes, { name: '', quantity: '', price: '', discountedPrice: '', discountPercent: '' }]);
    };
    const addImg = () => {
        setImagesUrl([...imagesUrl, ""]);
    };

    const updateSizeField = (index, field, value) => {
        const updatedSizes = sizes.map((size, i) =>
            i === index ? { ...size, [field]: value } : size
        );
        setSizes(updatedSizes);
    };
    const updateImageField = (index, value) => {
        console.log(imagesUrl)
        const updatedImages = imagesUrl.map((img, i) =>
            i === index ? value : img
        );
        setImagesUrl(updatedImages);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImagesUrl(result.uri);
        }
    };

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const productData = {
                imagesUrl: imagesUrl.map(img => (img)),
                brand,
                title,
                description,
                topLevelCategory,
                secondLevelCategory,
                thirdLevelCategory,
                // category: [topLevelCategory, secondLevelCategory, thirdLevelCategory],
                sizes: sizes.map(size => ({
                    name: size.name,
                    quantity: parseInt(size.quantity),
                    price: parseFloat(size.price),
                    discountedPrice: parseFloat(size.discountedPrice),
                    discountPercent: parseFloat(size.discountPercent)
                }))
            };
            await axios.post("http://192.168.0.106:5454/api/admin/products", productData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert("Success", "Product added successfully!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not add product. Please try again.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Product title" />

            <Text style={styles.label}>Brand</Text>
            <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="Enter brand name" />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Product description" multiline />

            <Text style={styles.label}>Image URL</Text>
            {imagesUrl.map((imageUrl, index) => (
                <View key={index} style={styles.sizeContainer}>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={value => updateImageField(index, value)} placeholder="Paste Image URL" />
                </View>
            ))}
            <TouchableOpacity onPress={addImg} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Images</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : <Text>Select Image</Text>}
            </TouchableOpacity> */}
            <Text style={styles.label}>Categories</Text>
            <TextInput style={styles.input} value={topLevelCategory} onChangeText={setTopLevelCategory} placeholder="Top Level Category" />
            <TextInput style={styles.input} value={secondLevelCategory} onChangeText={setSecondLevelCategory} placeholder="Second Level Category" />
            <TextInput style={styles.input} value={thirdLevelCategory} onChangeText={setThirdLevelCategory} placeholder="Third Level Category" />

            <Text style={styles.label}>Sizes</Text>
            {sizes.map((size, index) => (
                <View key={index} style={styles.sizeContainer}>
                    <Text>Size: {index + 1}</Text>
                    <TextInput style={styles.input} placeholder="Size e.g. - 1Kg or 1L" value={size.name} onChangeText={value => updateSizeField(index, 'name', value)} />
                    <TextInput style={styles.input} placeholder="Quantity in Stock" value={size.quantity} onChangeText={value => updateSizeField(index, 'quantity', value)} keyboardType="numeric" />
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
    sizeContainer: { flexDirection: 'column', marginBottom: 10 },
    addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginVertical: 10 },
    addButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
    submitButton: { backgroundColor: 'green', padding: 15, borderRadius: 5, marginVertical: 20, alignItems: 'center' },
    submitButtonText: { color: 'white', fontWeight: 'bold' }
});
