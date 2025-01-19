import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTopBar from '../components/CustomTopBar';

export default function AddPost({ navigation }) {
    const [images, setImages] = useState([]); // For preview of selected images
    const [brand, setBrand] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [topLevelCategory, setTopLevelCategory] = useState('');
    const [secondLevelCategory, setSecondLevelCategory] = useState('');
    const [thirdLevelCategory, setThirdLevelCategory] = useState('');
    const [sizes, setSizes] = useState([
        { name: '', quantity: '', price: '', discountedPrice: '', discountPercent: '' },
    ]);

    const addSize = () => {
        setSizes([...sizes, { name: '', quantity: '', price: '', discountedPrice: '', discountPercent: '' }]);
    };

    const updateSizeField = (index, field, value) => {
        const updatedSizes = sizes.map((size, i) =>
            i === index ? { ...size, [field]: value } : size
        );
        setSizes(updatedSizes);
    };

    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need access to your photos to upload images.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true, // Allow multiple selection
            selectionLimit: 5 - images.length, // Limit based on remaining slots
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = result.assets.map(asset => asset.uri);
            setImages(prevImages => [...prevImages, ...newImages].slice(0, 5)); // Ensure total is not > 5
        }
    };

    const removeImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async () => {
        if (images.length === 0) {
            Alert.alert('Error', 'Please select at least one image.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');

            const formData = new FormData();

            images.forEach((uri, index) => {
                formData.append('images', {
                    uri,
                    type: 'image/jpeg',
                    name: `image${index}.jpg`,
                });
            });

            formData.append('brand', brand);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('topLevelCategory', topLevelCategory);
            formData.append('secondLevelCategory', secondLevelCategory);
            formData.append('thirdLevelCategory', thirdLevelCategory);
            formData.append('sizes', JSON.stringify(sizes));

            await axios.post("http://192.168.198.195:5454/api/admin/products", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Success', 'Product added successfully!');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Could not add product. Please try again.');
        }
    };

    return (
        <>
            <CustomTopBar navigation={navigation} title="Add Product" />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.label}>Product Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter product title"
                />

                <Text style={styles.label}>Brand Name</Text>
                <TextInput
                    style={styles.input}
                    value={brand}
                    onChangeText={setBrand}
                    placeholder="Enter brand name"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter product description"
                    multiline
                />

                <Text style={styles.label}>Product Images</Text>
                <View style={styles.imageContainer}>
                    {images.map((uri, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri }} style={styles.image} />
                            <TouchableOpacity
                                style={styles.crossButton}
                                onPress={() => removeImage(index)}
                            >
                                <Text style={styles.crossButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                {images.length < 5 && (
                    <TouchableOpacity onPress={pickImages} style={styles.addButton}>
                        <Text style={styles.addButtonText}>
                            {images.length === 0 ? 'Select Images' : 'Add More Images'}
                        </Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.label}>Categories</Text>
                <TextInput
                    style={styles.input}
                    value={topLevelCategory}
                    onChangeText={setTopLevelCategory}
                    placeholder="Top Level Category"
                />
                <TextInput
                    style={styles.input}
                    value={secondLevelCategory}
                    onChangeText={setSecondLevelCategory}
                    placeholder="Second Level Category"
                />
                <TextInput
                    style={styles.input}
                    value={thirdLevelCategory}
                    onChangeText={setThirdLevelCategory}
                    placeholder="Third Level Category"
                />

                <Text style={styles.label}>Product Sizes</Text>
                {sizes.map((size, index) => (
                    <View key={index} style={styles.sizeContainer}>
                        <Text style={styles.sizeLabel}>Size {index + 1}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Size (e.g., 1Kg or 1L)"
                            value={size.name}
                            onChangeText={value => updateSizeField(index, 'name', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Quantity in Stock"
                            value={size.quantity}
                            onChangeText={value => updateSizeField(index, 'quantity', value)}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            value={size.price}
                            onChangeText={value => updateSizeField(index, 'price', value)}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Discounted Price"
                            value={size.discountedPrice}
                            onChangeText={value => updateSizeField(index, 'discountedPrice', value)}
                            keyboardType="numeric"
                        />
                    </View>
                ))}
                <TouchableOpacity onPress={addSize} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Size</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Save Product</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f8f8f8' },
    label: { fontWeight: 'bold', marginTop: 10, color: '#555' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginVertical: 5, backgroundColor: 'white' },
    textArea: { height: 80 },
    imageContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
    imageWrapper: { position: 'relative', marginRight: 10, marginBottom: 10 },
    image: { width: 80, height: 80, borderRadius: 5 },
    crossButton: { position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 15, padding: 2 },
    crossButtonText: { color: 'white', fontWeight: 'bold' },
    sizeContainer: { marginBottom: 10, padding: 10, backgroundColor: 'white', borderRadius: 5 },
    sizeLabel: { fontWeight: 'bold', marginBottom: 5 },
    addButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginVertical: 10 },
    addButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
    submitButton: { backgroundColor: 'green', padding: 15, borderRadius: 5, marginVertical: 20, alignItems: 'center' },
    submitButtonText: { color: 'white', fontWeight: 'bold' },
});
