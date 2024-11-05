import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function AddPost() {
    const [category, setCategory] = useState('Crops');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('kg');
    const [price, setPrice] = useState('');
    const [priceUnit, setPriceUnit] = useState('Per kg');
    const [availableFrom, setAvailableFrom] = useState(new Date().toISOString().split('T')[0]);
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [subDistrict, setSubDistrict] = useState('');
    const [village, setVillage] = useState('');
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handleSubmit = () => {
        // Implement submission logic here
        alert('Post submitted!');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Category*</Text>
            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Crops" value="Crops" />
                <Picker.Item label="Vegetable" value="Vegetable" />
                <Picker.Item label="Fruits" value="Fruits" />
                <Picker.Item label="Nursery & Plants" value="Nursery & Plants" />
                {/* Add other categories here */}
            </Picker>

            <Text style={styles.label}>Enter Title*</Text>
            <TextInput style={styles.input} placeholder="Enter Title" value={title} onChangeText={setTitle} />

            <Text style={styles.label}>Enter Description*</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Text style={styles.label}>Item Quantity*</Text>
            <TextInput style={styles.input} placeholder="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />

            <Picker selectedValue={unit} style={styles.picker} onValueChange={(itemValue) => setUnit(itemValue)}>
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="Ton" value="Ton" />
                <Picker.Item label="Gram" value="Gram" />
                <Picker.Item label="Box" value="Box" />
            </Picker>

            <Text style={styles.label}>Expected Price*</Text>
            <TextInput style={styles.input} placeholder="₹" value={price} onChangeText={setPrice} keyboardType="numeric" />

            <Picker selectedValue={priceUnit} style={styles.picker} onValueChange={(itemValue) => setPriceUnit(itemValue)}>
                <Picker.Item label="Per 20kg" value="Per 20kg" />
                <Picker.Item label="Per Ton" value="Per Ton" />
                <Picker.Item label="Per kg" value="Per kg" />
                <Picker.Item label="Per Gram" value="Per Gram" />
            </Picker>

            <Text style={styles.label}>Available From*</Text>
            <TextInput style={styles.input} placeholder="Available From" value={availableFrom} onChangeText={setAvailableFrom} />

            <Text style={styles.label}>Enter Mobile No*</Text>
            <TextInput style={styles.input} placeholder="Enter Mobile No" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />

            <Text style={styles.label}>Enter Address*</Text>
            <TextInput style={styles.input} placeholder="Enter Address" value={address} onChangeText={setAddress} />

            <Text style={styles.label}>Select State*</Text>
            <Picker selectedValue={state} style={styles.picker} onValueChange={(itemValue) => setState(itemValue)}>
                <Picker.Item label="Select State" value="" />
                {/* Populate with actual states */}
            </Picker>

            <Text style={styles.label}>Select District*</Text>
            <Picker selectedValue={district} style={styles.picker} onValueChange={(itemValue) => setDistrict(itemValue)}>
                <Picker.Item label="Select District" value="" />
                {/* Populate with actual districts */}
            </Picker>

            <Text style={styles.label}>Select Sub District*</Text>
            <Picker selectedValue={subDistrict} style={styles.picker} onValueChange={(itemValue) => setSubDistrict(itemValue)}>
                <Picker.Item label="Select Sub District" value="" />
                {/* Populate with actual sub-districts */}
            </Picker>

            <Text style={styles.label}>Select Village*</Text>
            <Picker selectedValue={village} style={styles.picker} onValueChange={(itemValue) => setVillage(itemValue)}>
                <Picker.Item label="Select Village" value="" />
                {/* Populate with actual villages */}
            </Picker>

            <Text style={styles.label}>Upload Image*</Text>
            <View style={styles.imageContainer}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Button title="Pick an image from gallery" onPress={pickImage} />
                <Button title="Take a photo" onPress={takePhoto} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 10,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
