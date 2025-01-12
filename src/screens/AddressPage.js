import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddAddressPage = ({ navigation }) => {
    const [pinCode, setPinCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');

    const districts = ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Serchhip', 'Lawngtlai', 'Mamit', 'Saiha'];
    const cities = {
        Aizawl: ['Aizawl City', 'Durtlang', 'Bawngkawn'],
        Lunglei: ['Lunglei City', 'Hnahthial', 'Sangau'],
        Champhai: ['Champhai City', 'Khawbung', 'Vapar'],
        // Add cities for other districts
    };

    const handleSaveAddress = async () => {
        if (!firstName || !lastName || !streetAddress || !district || !city || !mobile || !pinCode) {
            Alert.alert('Validation Error', 'Please fill out all fields.');
            return;
        }

        const payload = {
            firstName,
            lastName,
            streetAddress,
            city,
            state: 'Mizoram',
            zipCode: pinCode,
            mobile,
        };

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post('http://192.168.198.195:5454/api/users/address', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200 || response.status === 201) {
                Alert.alert('Success', 'Address added successfully!');
                navigation.goBack();
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add address. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Add New Address</Text>
                <TouchableOpacity onPress={() => { setFirstName(''); setLastName(''); setStreetAddress(''); setDistrict(''); setCity(''); setMobile(''); setPinCode(''); }}>
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
            />
            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Street Address"
                value={streetAddress}
                onChangeText={setStreetAddress}
                multiline
            />
            <Picker
                selectedValue={district}
                onValueChange={(value) => setDistrict(value)}
                style={styles.input}
            >
                <Picker.Item label="Select District" value="" />
                {districts.map((district, index) => (
                    <Picker.Item key={index} label={district} value={district} />
                ))}
            </Picker>
            <Picker
                selectedValue={city}
                onValueChange={(value) => setCity(value)}
                style={styles.input}
                enabled={!!district}
            >
                <Picker.Item label="Select City" value="" />
                {district && cities[district]
                    ? cities[district].map((city, index) => (
                        <Picker.Item key={index} label={city} value={city} />
                    ))
                    : null}
            </Picker>
            <TextInput
                style={styles.input}
                placeholder="Pin Code"
                value={pinCode}
                onChangeText={setPinCode}
                keyboardType="numeric"
            />

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={handleSaveAddress}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddAddressPage;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#FFFFFF' },
    topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    pageTitle: { fontSize: 18, fontWeight: 'bold' },
    clearAllText: { color: '#FF0000', fontSize: 16 },
    input: { height: 50, borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10, fontSize: 16, color: '#333333' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
    backButton: { flex: 1, backgroundColor: '#E0E0E0', paddingVertical: 12, marginRight: 8, borderRadius: 8, alignItems: 'center' },
    continueButton: { flex: 1, backgroundColor: '#28A745', paddingVertical: 12, marginLeft: 8, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
