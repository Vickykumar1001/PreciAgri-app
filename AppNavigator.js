import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/screens/OnBoradingScreen.js';
import HomeScreen from './src/screens/Dashboard.js';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/ResigterScreen.js';

const Stack = createStackNavigator();

const AppNavigator = ({ isFirstLaunch, setIsFirstLaunch, isAuthenticated }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="Onboarding">
          {(props) => (
            <OnboardingScreen {...props} onDone={() => setIsFirstLaunch(false)} />
          )}
        </Stack.Screen>
      ) : isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;