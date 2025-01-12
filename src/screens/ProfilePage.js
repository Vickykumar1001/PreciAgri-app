import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import CustomTopBar from '../components/CustomTopBar';
const profileIcon = require('../assets/images/user-icon.png');
import FooterNavigation from '../components/FooterNavigation';
export default function ProfilePage({ navigation }) {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    const fetchProfileData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const role = await AsyncStorage.getItem('role');
            setRole(role)
            if (!token) throw new Error("No token found");

            const response = await axios.get("http://192.168.198.195:5454/api/users/profile", {
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
    // useEffect(() => {
    //     fetchProfileData();
    // }, []);
    useFocusEffect(
        useCallback(() => {
            fetchProfileData();
        }, [])
    );
    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />;
    }

    return (
        <><CustomTopBar navigation={navigation} title={"My Profile"} />
            <View style={styles.container}>


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
                    <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('EditProfile', { profileData: { firstName: profileData?.firstName, lastName: profileData?.lastName, email: profileData?.email, mobile: profileData?.mobile } })}>
                        <Ionicons name="person" size={24} color="#777" />
                        <Text style={styles.optionText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('ShowAddress', { addresses: profileData?.addresses })}>
                        <Ionicons name="location" size={24} color="#777" />
                        <Text style={styles.optionText}>My Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('UserProducts', { products: profileData?.product })}>
                        <FontAwesome name="file-text" size={24} color="#777" />
                        <Text style={styles.optionText}>My Products</Text>
                    </TouchableOpacity>
                    {
                        role === 'Seller' && <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('SellerOrder', { products: profileData?.product })}>
                            <FontAwesome name="file-text" size={24} color="#777" />
                            <Text style={styles.optionText}>Orders Received</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Wishlist')}>
                        <FontAwesome name="shopping-bag" size={24} color="#777" />
                        <Text style={styles.optionText}>My Wishlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('ChangePassword', { email: profileData?.email })}>
                        <FontAwesome name="lock" size={24} color="#777" />
                        <Text style={styles.optionText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('Logout')}>
                        <AntDesign name="logout" size={24} color="#777" />
                        <Text style={styles.optionText}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Footer Navigation */}
                <FooterNavigation navigation={navigation} activePage={"Profile"} role={role} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileCard: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        margin: 10,
        padding: 10,
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
        padding: 10,
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
