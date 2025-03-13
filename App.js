import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-native-paper';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { theme } from './src/core/theme';
import Toast from 'react-native-toast-message';
import AppProviders from './src/context/AppProviders';
import {
  StartScreen,
  LoginScreen,
  SignUpScreen,
  ResetPasswordScreen,
  Dashboard,
  VerifyEmail,
  VerifyEmailonRegister,
  ChangePassword,
  HomePage,
  ShopPage,
  ProductDetailPage,
  Wishlist,
  CartPage,
  AddAddressPage,
  ProfilePage,
  ArticleDetail,
  NewsAndSchemesTabView,
  LogoutScreen,
  UserProducts,
  ResetForgotPassword,
  EditProfilePage

} from './src/screens';
// import { ProductContainer } from "./src/screens/Products/ProductContainer"
import AppNavigator from './AppNavigator';
import WeatherPage from './src/screens/WeatherPage';
import ShowAddressPage from './src/screens/ShowAddressPage';
import AddPost from './src/screens/AddPost';
import EditPost from './src/screens/EditPost';
import SelectAddressPage from './src/screens/SelectAddressPage';
import OrderSummaryPage from './src/screens/OrderSummaryPage';
import SellerOrdersPage from './src/screens/SellerOrderPage';
import FarmingTipsPage from './src/screens/FarmingTipsPage';
import AboutUs from './src/screens/AboutUs';
import ContactUs from './src/screens/ContactUs';
import CategoryScreen from './src/screens/CategoryScreen';

// Keep splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
const loadFonts = async () => {
  await Font.loadAsync({
    'Lobster-Regular': require('./src/assets/fonts/Lobster-Regular.ttf'),
  });
};

const StackNav = ({ route }) => {
  const { isAuthenticated } = route.params;
  console.log("isAuthenticated", isAuthenticated);
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'HomePage' : 'StartScreen'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="VerifyEmailonRegister" component={VerifyEmailonRegister} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ResetForgotPassword" component={ResetForgotPassword} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Shop" component={ShopPage} />
      <Stack.Screen name="ProductDetail" component={ProductDetailPage} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Cart" component={CartPage} />
      <Stack.Screen name="AddAddress" component={AddAddressPage} />
      <Stack.Screen name="ShowAddress" component={ShowAddressPage} />
      <Stack.Screen name="Weather" component={WeatherPage} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="EditProfile" component={EditProfilePage} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="EditPost" component={EditPost} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="UserProducts" component={UserProducts} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="News" component={NewsAndSchemesTabView} options={{ title: 'News & Schemes' }} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetail} options={{ headerShown: false }} />
      <Stack.Screen name="SelectAddress" component={SelectAddressPage} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryPage} />
      <Stack.Screen name="SellerOrder" component={SellerOrdersPage} />
      <Stack.Screen name="FarmingTips" component={FarmingTipsPage} />
    </Stack.Navigator>
  )
}
const App = () => {
  const Drawer = createDrawerNavigator();
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

        // Check authentication status (you can also use an API callr if needed)
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setIsAuthenticated(true); // Set based on the token presence
        } else {
          setIsAuthenticated(false);
        }
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
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Provider theme={theme}>
          <AppProviders>
            <NavigationContainer>
              {isFirstLaunch ? (
                <AppNavigator
                  isFirstLaunch={isFirstLaunch}
                  setIsFirstLaunch={setIsFirstLaunch}
                  isAuthenticated={isAuthenticated}
                />
              ) : (<Drawer.Navigator screenOptions={{ headerShown: false }} >
                <Drawer.Screen name="Home" component={StackNav} initialParams={{ isAuthenticated }} />
                <Drawer.Screen name="Profile" component={ProfilePage} />
                <Drawer.Screen name="Wishlist" component={Wishlist} />
                <Drawer.Screen name="Cart" component={CartPage} />
                <Drawer.Screen name="About" component={AboutUs} />
                <Drawer.Screen name="Contact-Us" component={ContactUs} />
                <Drawer.Screen name="Logout" component={LogoutScreen} />
              </Drawer.Navigator>

              )}
              <Toast />
            </NavigationContainer>
          </AppProviders>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default App;
