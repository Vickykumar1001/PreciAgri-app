import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const SelectAddressPage = ({ navigation }) => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(
                    'http://192.168.158.195:5454/api/users/address',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
                Alert.alert('Error', 'Failed to load addresses.');
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true); // Show loader
            fetchAddresses(); // Refetch addresses
        });

        return unsubscribe; // Cleanup the listener on unmount
    }, [navigation]);

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const handleContinue = async () => {
        if (selectedAddress) {
            try {
                const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
                const response = await axios.post(
                    'http://192.168.158.195:5454/api/orders', // Replace with your API endpoint
                    { address: selectedAddress }, // Sending the selected address in the request body
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in headers for authentication
                        },
                    }
                );

                const createdOrder = response.data; // Assume the response contains the created order
                console.log(createdOrder);
                navigation.navigate('OrderSummary', { order: createdOrder }); // Navigate to OrderSummary with order details
            } catch (error) {
                console.error('Error creating order:', error);
                Alert.alert('Error', 'Failed to create order. Please try again.');
            }
        } else {
            Alert.alert('Error', 'Please select an address.');
        }
    };


    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Address</Text>
            </View>

            {/* Address List */}
            <FlatList
                data={addresses}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.addressContainer,
                            selectedAddress?._id === item._id && styles.selectedAddress,
                        ]}
                        onPress={() => handleSelectAddress(item)}
                    >
                        <Text style={styles.nameText}>
                            {item.firstName} {item.lastName}
                        </Text>
                        <Text style={styles.addressText}>{item.streetAddress}</Text>
                        <Text style={styles.addressText}>
                            {item.city}, {item.state} - {item.zipCode}
                        </Text>
                        <Text style={styles.phoneText}>Mobile: {item.mobile}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* Buttons */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddAddress')}
            >
                <Text style={styles.addButtonText}>+ Add New Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#4CAF50',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    addressContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedAddress: {
        borderColor: '#4CAF50',
        borderWidth: 2,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2,
    },
    phoneText: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },
    addButton: {
        margin: 16,
        padding: 12,
        backgroundColor: '#4CAF50',
        borderRadius: 4,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    continueButton: {
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#FFA726',
        borderRadius: 4,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
});

export default SelectAddressPage;
