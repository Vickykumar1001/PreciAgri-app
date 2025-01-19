import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import CustomTopBar from '../components/CustomTopBar';

const sidebarCategories = [
    { name: 'Farm Equipment', image: require('../assets/images/icons/category/farmer.png') },
    { name: 'Seeds', image: require('../assets/images/seed.png') },
    { name: 'Fertilizers', image: require('../assets/images/fertilizer.png') },
    { name: 'Soil Amendments', image: require('../assets/images/icons/category/soilAmendments.png') },
    { name: 'Crop Protection', image: require('../assets/images/icons/category/cropProtection.png') },
];

const mainCategories = {
    "Farm Equipment": [
        {
            title: 'Irrigation Equipment',
            items: [
                { label: 'Water Pumps', image: require('../assets/images/icons/category/water-pump.png') },
                { label: 'Sprinklers', image: require('../assets/images/icons/category/sprinkler.png') },
                { label: 'Drip Systems', image: require('../assets/images/icons/category/irrigation.png') },
            ],
        },
        {
            title: 'Hand Tools',
            items: [
                { label: 'Hoes', image: require('../assets/images/icons/category/hoe.png') },
                { label: 'Trowels', image: require('../assets/images/icons/category/trowel.png') },
                { label: 'Pruners', image: require('../assets/images/icons/category/pruners.png') },
            ],
        },
        {
            title: 'Machinery',
            items: [
                { label: 'Tractors', image: require('../assets/images/icons/category/tractor.png') },
                { label: 'Harvesters', image: require('../assets/images/icons/category/harvester.png') }
            ],
        },
        {
            title: 'Sprayers',
            items: [
                { label: 'Crop Sprayers', image: require('../assets/images/icons/category/sprayer.png') },
                { label: 'Agri Sprayers', image: require('../assets/images/icons/category/sprayer.png') },
            ],
        },
    ],
    "Seeds": [
        {
            title: 'Vegetable Seeds',
            items: [
                { label: 'Carrot', image: require('../assets/images/icons/category/carrot.png') },
                { label: 'Radish', image: require('../assets/images/icons/category/food.png') },
                { label: 'Tomato', image: require('../assets/images/icons/category/tomato.png') },
                { label: 'Beans', image: require('../assets/images/icons/category/beans.png') },
                { label: 'Pumpkin', image: require('../assets/images/icons/category/pumpkin.png') },
            ],
        },
        {
            title: 'Fruit Seeds',
            items: [
                { label: 'Watermelon', image: require('../assets/images/icons/category/watermelon.png') },
                { label: 'Orange', image: require('../assets/images/icons/category/orange.png') },
                { label: 'Pine Apple', image: require('../assets/images/icons/category/pine_apple.png') },
            ],
        },
        // {
        //     title: 'Herb Seeds',
        //     items: [
        //         { label: 'Tulsi', image: require('../assets/images/seed.png') },
        //         { label: 'Pakchoy', image: require('../assets/images/seed.png') },
        //     ],
        // },
    ],
    "Fertilizers": [
        {
            title: 'Organic Fertilizers',
            items: [
                { label: 'Vermi Compost', image: require('../assets/images/seed.png') },
                { label: 'Mustard Cake Powder', image: require('../assets/images/seed.png') },
                { label: 'Mustard Oil Cake', image: require('../assets/images/seed.png') },
            ],
        },
        {
            title: 'Chemical Fertilizers',
            items: [
                { label: '2,4-D Sodium Salt', image: require('../assets/images/seed.png') },
                { label: 'Sulphur 90% WDG', image: require('../assets/images/seed.png') },
            ],
        },
        {
            title: 'Plant Growth Boosters',
            items: [
                { label: 'Tomato Fertilizer', image: require('../assets/images/seed.png') },
                { label: 'Flower Booster', image: require('../assets/images/seed.png') },
            ],
        },
    ],
    "Soil and Soil Amendments": [
        {
            title: 'Soil Mixes',
            items: [
                { label: 'Rose Potting Soil Mix', image: require('../assets/images/seed.png') },
                { label: 'Bonsai Potting Mix', image: require('../assets/images/seed.png') },
            ],
        },
        {
            title: 'Soil Conditioners',
            items: [
                { label: 'Coconut Husk Chips', image: require('../assets/images/seed.png') },
                { label: 'Perlite', image: require('../assets/images/seed.png') },
                { label: 'Vermiculite', image: require('../assets/images/seed.png') },
            ],
        },
    ],
    "Crop Protection": [
        {
            title: 'Insecticides',
            items: [
                { label: 'Fury Insecticide', image: require('../assets/images/seed.png') },
                { label: 'Spino 505', image: require('../assets/images/seed.png') },
            ],
        },
        {
            title: 'Herbicides',
            items: [
                { label: 'Glycel', image: require('../assets/images/seed.png') },
                { label: 'Fire Non-Selective Herbicide', image: require('../assets/images/seed.png') },
            ],
        },
    ],
    "Livestock Management": [
        {
            title: 'Animal Feeds',
            items: [
                { label: 'Cattle Feed', image: require('../assets/images/seed.png') },
                { label: 'Poultry Feed', image: require('../assets/images/seed.png') },
                { label: 'Fish Feed', image: require('../assets/images/seed.png') },
            ],
        },
        {
            title: 'Veterinary Products',
            items: [
                { label: 'Vaccines', image: require('../assets/images/seed.png') },
                { label: 'Medicines', image: require('../assets/images/seed.png') },
            ],
        },
    ],
    "Farm Management Tools": [
        {
            title: 'Software',
            items: [
                { label: 'Farm Management Software', image: require('../assets/images/seed.png') },
                { label: 'Weather Forecasting Tools', image: require('../assets/images/seed.png') },
            ],
        },
        {
            title: 'Hardware',
            items: [
                { label: 'GPS Devices', image: require('../assets/images/seed.png') },
                { label: 'Drones', image: require('../assets/images/seed.png') },
            ],
        },
    ],
    "E-commerce and Farm-to-Market": [
        {
            title: 'Platforms',
            items: [
                { label: 'Online Marketplaces', image: require('../assets/images/seed.png') },
                { label: 'Farm Product Delivery', image: require('../assets/images/seed.png') },
            ],
        },
    ],
    "Educational Resources": [
        {
            title: 'Books and Guides',
            items: [
                {
                    label: 'Farming Techniques', image: require('../assets/images/seed.png')
                },
                { label: 'Organic Farming', image: require('../assets/images/seed.png') },],
        }, { title: 'Workshops and Training', items: [{ label: 'Sustainable Farming Workshops', image: require('../assets/images/seed.png') }, { label: 'Livestock Management Training', image: require('../assets/images/seed.png') },], },], "Sustainable Farming": [{ title: 'Eco - Friendly Products', items: [{ label: 'Biodegradable Mulch', image: require('../assets/images/seed.png') }, { label: 'Compostable Pots', image: require('../assets/images/seed.png') },], }, { title: 'Renewable Energy', items: [{ label: 'Solar Pumps', image: require('../assets/images/seed.png') }, { label: 'Wind Energy Systems', image: require('../assets/images/seed.png') },], },],
};

const App = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('Farm Equipment');

    return (
        <>
            <CustomTopBar navigation={navigation} title={"Category"} />

            <View style={styles.container}>
                {/* Sidebar */}
                <View style={styles.sidebar}>
                    {sidebarCategories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.sidebarItem,
                                selectedCategory === category.name && styles.sidebarItemSelected,
                            ]}
                            onPress={() => setSelectedCategory(category.name)}
                        >
                            <Image source={category.image} style={styles.categoryImage} />
                            <Text
                                style={[
                                    styles.sidebarItemText,
                                    selectedCategory === category.name && styles.sidebarItemTextSelected,
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Main Content */}
                <ScrollView style={styles.mainContent}>
                    {mainCategories[selectedCategory]?.map((category, index) => (
                        <View key={index} style={styles.category}>
                            <Text style={styles.categoryTitle}>{category.title}</Text>
                            <View style={styles.itemsContainer}>
                                {category.items.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.item} onPress={() => { navigation.navigate('Shop', { category: item.label }); }} >
                                        <Image source={item.image} style={styles.itemImage} />
                                        <Text style={styles.itemLabel}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    sidebar: {
        width: '25%',
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    sidebarItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    sidebarItemSelected: {
        backgroundColor: '#e6e6e6',
    },
    sidebarItemText: {
        fontSize: 13,
        fontWeight: 600,
        color: '#333',
        marginTop: 5,

    },
    sidebarItemTextSelected: {
        fontWeight: 'bold',
        color: '#000',
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 10,
    },
    category: {
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    categoryImage: {
        alignContent: 'center',
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    item: {
        width: '33%',
        alignItems: 'center',
        marginBottom: 15,
    },
    itemImage: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    itemLabel: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default App;
