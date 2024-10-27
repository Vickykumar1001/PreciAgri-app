import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import CheckBox from '@react-native-community/checkbox';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddAddressPage = ({ navigation }) => {
    const [pinCode, setPinCode] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [taluk, setTaluk] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    const districts = ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Serchhip', 'Lawngtlai', 'Mamit', 'Saiha'];
    const cities = [
        ['Aizawl City', 'Durtlang', 'Bawngkawn'],
        ['Lunglei City', 'Hnahthial', 'Sangau'],
        // Add additional city options based on districts
    ];

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.pageTitle}>Add New Address</Text>
                <TouchableOpacity >
                    <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <Text style={styles.sectionTitle}>Add New Address</Text>

            <TextInput
                style={styles.input}
                placeholder="Pin Code"
                value={pinCode}
                onChangeText={setPinCode}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Address*"
                value={address}
                onChangeText={setAddress}
                multiline
            />

            <Picker
                selectedValue="Mizoram"
                style={styles.input}
                enabled={false}
            >
                <Picker.Item label="Mizoram" value="Mizoram" />
            </Picker>

            <Picker
                selectedValue={district}
                onValueChange={(value) => {
                    setDistrict(value)
                }
                }
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
            >
                <Picker.Item label="Select City" value="" />
                {district && cities[0] ? cities[0].map((city, index) => (
                    <Picker.Item key={index} label={city} value={city} />
                )) : null}
            </Picker>

            <TextInput
                style={styles.input}
                placeholder="Taluk"
                value={taluk}
                onChangeText={setTaluk}
            />

            {/* <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isDefault}
                    onValueChange={setIsDefault}
                    tintColors={{ true: '#28A745', false: '#333' }}
                />
                <Text style={styles.label}>Make Default</Text>
            </View> */}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={() => {/* Handle address saving logic */ }}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddAddressPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearAllText: {
        color: '#FF0000',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: 16,
        color: '#333333',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    backButton: {
        flex: 1,
        backgroundColor: '#E0E0E0',
        paddingVertical: 12,
        marginRight: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButton: {
        flex: 1,
        backgroundColor: '#28A745',
        paddingVertical: 12,
        marginLeft: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
