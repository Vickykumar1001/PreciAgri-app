import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const ShowAddressPage = ({ navigation }) => {
    // Sample data for demonstration
    const addressesDemo = [
        {
            id: 1,
            name: 'Vicky Kumar',
            address: 'ICFAI, Durtlang North, Aibawk, Aizawl, Mizoram, India',
            phone: '+917903645789',
            isPrimary: true,
        },
        // Additional sample addresses can be added here
    ];
    addresses = addressesDemo;
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Addresses</Text>
            </View>
            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.addressContainer}>
                        <View style={styles.addressHeader}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            {item.isPrimary && <Text style={styles.primaryText}>Primary</Text>}
                        </View>
                        <Text style={styles.addressText}>{item.address}</Text>
                        <Text style={styles.phoneText}>{item.phone}</Text>
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddAddress')}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAddress')}>
                <Text style={styles.addButtonText}>+ Add New Address</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        padding: 16,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
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
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    primaryText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    addressText: {
        fontSize: 14,
        marginTop: 4,
    },
    phoneText: {
        fontSize: 14,
        marginTop: 2,
        color: '#777',
    },
    editButton: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
});

export default ShowAddressPage;