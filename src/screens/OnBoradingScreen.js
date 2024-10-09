import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Text,Image } from 'react-native';

const OnBoardingScreen = ({ onDone }) => {
  return (
    <Onboarding
      onSkip={onDone}
      onDone={onDone}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/icon.png')} />,
          title: 'Welcome',
          subtitle: 'An introduction to our app!',
        },
        {
          backgroundColor: '#fe6e58',
          image:  <Image source={require('../assets/images/icon.png')} />,
          title: 'For Farmers',
          subtitle: 'Sell your produce directly.',
        },
        {
          backgroundColor: '#999',
          image:  <Image source={require('../assets/images/icon.png')} />,
          title: 'For Consumers',
          subtitle: 'Get fresh produce directly from farmers.',
        },
      ]}
    />
  );
};

export default OnBoardingScreen;
