import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';
import ProfileTopBar from '../components/ProfileTopBar';

export default function EditProfilePage({ navigation }) {
    const [fullName, setFullName] = useState('Person');
    const [email, setEmail] = useState('person@gmail.com');
    const [category, setCategory] = useState('Farmer');
    const [contactNumber, setContactNumber] = useState('+91');

    const handleSaveChanges = () => {
        // Show a toast message
        ToastAndroid.show('Profile changes saved successfully!', ToastAndroid.SHORT);

        // Navigate back to the previous screen
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <ProfileTopBar navigation={navigation} />

            {/* Profile Picture */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <View style={styles.imageButtons}>
                    <TouchableOpacity style={styles.cameraButton}>
                        <FontAwesome name="camera" size={16} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
                        <FontAwesome name="trash" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Full Name*</Text>
                <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter full name"
                />

                <Text style={styles.label}>Email Address*</Text>
                <View style={styles.emailContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        value={email}
                        onChangeText={setEmail}
                        editable={false}
                    />
                    <Text style={styles.verifiedText}>Verified</Text>
                </View>

                <Text style={styles.label}>Category*</Text>
                <View style={styles.input}>
                    <Picker
                        style={styles.picker}
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                        <Picker.Item label="Farmer" value="Farmer" />
                        <Picker.Item label="Buyer" value="Buyer" />
                    </Picker>
                </View>

                <Text style={styles.label}>Contact Number*</Text>
                <TextInput
                    style={styles.input}
                    value={contactNumber}
                    onChangeText={setContactNumber}
                    placeholder="Enter contact number"
                    keyboardType="phone-pad"
                />
            </View>

            {/* Save Changes Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    imageButtons: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -10,
    },
    cameraButton: {
        backgroundColor: '#4CAF50',
        padding: 5,
        borderRadius: 20,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#FF5252',
        padding: 5,
        borderRadius: 20,
    },
    formContainer: {
        margin: 15,
        padding: 15,
        elevation: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        backgroundColor: '#F0FDF0',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    picker: {
        margin: -10,
        padding: 0,
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verifiedText: {
        marginLeft: 10,
        color: 'green',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        margin: 15,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});