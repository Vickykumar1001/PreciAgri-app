import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import ProfileTopBar from '../components/ProfileTopBar';

export default function ProfilePage({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <ProfileTopBar navigation={navigation} />

            {/* Profile Information */}
            <View style={styles.profileCard}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Person</Text>
                <Text style={styles.profileEmail}>Person@gmail.com</Text>
            </View>

            {/* Options List */}
            <ScrollView style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('EditProfile')}>
                    <Ionicons name="person" size={24} color="#777" />
                    <Text style={styles.optionText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate('ShowAddress')} >
                    <Ionicons name="location" size={24} color="#777" />
                    <Text style={styles.optionText}>My Address</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <FontAwesome name="file-text" size={24} color="#777" />
                    <Text style={styles.optionText}>My Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <MaterialIcons name="store" size={24} color="#777" />
                    <Text style={styles.optionText}>My Orders</Text>
                </TouchableOpacity>
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
    icon: {
        marginLeft: 15,
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
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileEmail: {
        color: '#555',
    },
    optionsContainer: {
        padding: 15,
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
