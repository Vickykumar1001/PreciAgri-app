import React, { useState, useEffect,useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    'Lobster-Regular': require('./src/assets/fonts/Lobster-Regular.ttf'), // Load your font here
  });
};
const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleFontsLoaded = useCallback(async () => {
    await loadFonts();
    setFontsLoaded(true);
    await SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
  }, []);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

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

        // Check authentication status from AsyncStorage (or API if needed)
        const userToken = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(userToken); // Set auth status based on token presence
      } catch (error) {
        console.error('Error checking launch or authentication status', error);
      }
    };

    checkFirstLaunch();
  }, []);
  if (!fontsLoaded) {
    handleFontsLoaded();
    return null; // Prevent rendering anything while fonts are loading
  }
  if (isFirstLaunch === null) {
    return null; // Add a loading spinner here if necessary
  }
  return (
    <AppNavigator
      isFirstLaunch={isFirstLaunch}
      setIsFirstLaunch={setIsFirstLaunch}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default App;
