import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import { AuthNavigator } from './auth-navigator';
import { SignupNavigator } from './signup-navigator';
import SplashCarouselScreen from '@/flows/splash-flow/splash-carousel-screen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Splash" component={SplashCarouselScreen} />
          <Stack.Screen name="AuthFlow" component={AuthNavigator} />
          <Stack.Screen name="SignupFlow" component={SignupNavigator} />
        </>
      ) : (
        <Stack.Screen name="Home" component={SignupNavigator} />
      )}
    </Stack.Navigator>
  );
};