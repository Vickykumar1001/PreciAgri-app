import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import OnBoardingScreen from './src/screens/OnBoradingScreen';
const Stack = createStackNavigator();

const AppNavigator = ({ isFirstLaunch, setIsFirstLaunch }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <Stack.Screen name="OnBoarding">
            {(props) => <OnBoardingScreen {...props} onDone={() => setIsFirstLaunch(false)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
