import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { theme } from './src/core/theme';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  VerifyEmail,
  VerifyEmailonRegister,
  ChangePassword,
  HomePage
} from './src/screens';
import AppNavigator from './AppNavigator';

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    'Lobster-Regular': require('./src/assets/fonts/Lobster-Regular.ttf'),
  });
};

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFontsLoaded = useCallback(async () => {
    await loadFonts();
    setFontsLoaded(true);
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          setIsFirstLaunch(false);
        }

        // Check authentication status (you can also use an API call if needed)
        const userToken = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!userToken); // Set based on the token presence
      } catch (error) {
        console.error('Error checking launch or authentication status', error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (!fontsLoaded) {
    handleFontsLoaded();
    return null; // Prevent rendering until fonts are loaded
  }

  if (isFirstLaunch === null) {
    return null; // Add a loading spinner here if necessary
  }

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        {isFirstLaunch ? (
          <AppNavigator
            isFirstLaunch={isFirstLaunch}
            setIsFirstLaunch={setIsFirstLaunch}
            isAuthenticated={isAuthenticated}
          />
        ) : (
          <Stack.Navigator
            initialRouteName={isAuthenticated ? 'Dashboard' : 'StartScreen'}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
            <Stack.Screen name="VerifyEmailonRegister" component={VerifyEmailonRegister} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Dashboard" component={HomePage} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
