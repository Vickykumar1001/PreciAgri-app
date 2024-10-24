// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './screens/HomePage'; // Your screen
import Profile from './screens/Profile'; // Example screen

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="HomePage">
                <Drawer.Screen name="Home" component={HomePage} />
                <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigator;
