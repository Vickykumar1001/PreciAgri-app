import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import ProfileTopBar from '../components/ProfileTopBar';
const profileIcon = require('../assets/images/user-icon.png');

export default function ProfilePage({ navigation }) {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const role = await AsyncStorage.getItem('role');
                setRole(role)
                if (!token) throw new Error("No token found");

                const response = await axios.get("https://preciagri-backend.onrender.com/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(response.data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <ProfileTopBar navigation={navigation} />

            {/* Profile Information Card */}
            <View style={styles.profileCard}>
                <Image
                    source={profileData?.profileImage ? { uri: profileData.profileImage } : profileIcon}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{profileData?.firstName} {profileData?.lastName}</Text>
                <Text style={styles.profileEmail}>{profileData?.email}</Text>
                <Text style={styles.infoText}>Mobile: {profileData?.mobile}</Text>
                <Text style={styles.profileRole}>Role: {profileData?.role}</Text>
            </View>

            {/* Options List */}
            <ScrollView style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('EditProfile', { profileData })}>
                    <Ionicons name="person" size={24} color="#777" />
                    <Text style={styles.optionText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('ShowAddress', { addresses: profileData?.addresses })}>
                    <Ionicons name="location" size={24} color="#777" />
                    <Text style={styles.optionText}>My Address</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('MyProducts', { products: profileData?.product })}>
                    <FontAwesome name="file-text" size={24} color="#777" />
                    <Text style={styles.optionText}>My Products</Text>
                </TouchableOpacity>
                {
                    role === 'Seller' && <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('OrdersReceived', { products: profileData?.product })}>
                        <FontAwesome name="file-text" size={24} color="#777" />
                        <Text style={styles.optionText}>Orders Received</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Wishlist')}>
                    <FontAwesome name="shopping-bag" size={24} color="#777" />
                    <Text style={styles.optionText}>My Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <FontAwesome name="lock" size={24} color="#777" />
                    <Text style={styles.optionText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <AntDesign name="logout" size={24} color="#777" />
                    <Text style={styles.optionText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                    <Ionicons name="home" size={28} color="#777" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Shop', { category: '' })}>
                    <Ionicons name="storefront" size={28} color="#777" />
                    <Text style={styles.footerText}>Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person" size={28} color="#4CAF50" />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('News')}>
                    <Ionicons name="newspaper" size={28} color="#777" />
                    <Text style={styles.footerText}>Article</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        margin: 15,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileEmail: {
        color: '#555',
        fontSize: 16,
    },
    profileRole: {
        color: '#555',
        fontSize: 14,
        marginVertical: 2,
    },
    verifiedText: {
        fontSize: 12,
        color: '#4CAF50',
        marginTop: 5,
    },
    infoSection: {
        backgroundColor: '#FFF',
        padding: 15,
        marginHorizontal: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 1,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
        color: '#333',
    },
    infoText: {
        fontSize: 14,
        color: '#555',
        paddingLeft: 5,
        marginBottom: 5,
    },
    optionsContainer: {
        paddingHorizontal: 15,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    optionText: {
        marginLeft: 15,
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#FFF',
    },
    footerText: {
        fontSize: 14,
        color: '#777',
    },
});
