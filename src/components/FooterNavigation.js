import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const FooterNavigation = ({ navigation, activePage, role }) => {
    const footerItems = [
        { name: 'Home', icon: 'home', route: 'HomePage', params: {}, activeColor: '#4CAF50' },
        { name: 'Shop', icon: 'storefront', route: 'Shop', params: { category: '' }, activeColor: '#4CAF50' },
        { name: 'Category', icon: 'grid', route: 'Category', params: {}, activeColor: '#4CAF50' },
        { name: 'Profile', icon: 'person', route: 'Profile', params: {}, activeColor: '#4CAF50' },
    ];

    if (role === 'Seller') {
        footerItems.splice(3, 0, {
            name: 'Sell',
            icon: 'cart',
            route: 'AddPost',
            params: {},
            activeColor: '#4CAF50',
        });
    }

    return (
        <View style={styles.footer}>
            {footerItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.footerItem}
                    onPress={() => navigation.navigate(item.route, item.params)}
                >
                    <Ionicons
                        name={item.icon}
                        size={28}
                        color={activePage === item.name ? item.activeColor : '#777'}
                    />
                    <Text style={[styles.footerText, activePage === item.name && styles.activeFooterText]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerItem: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#777',
        marginTop: 4,
    },
    activeFooterText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default FooterNavigation;
