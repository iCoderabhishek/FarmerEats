import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { loginSuccess } from '@/modules/auth/auth.slice';
import { getToken } from '@/core/storage/token-storage';
import { Colors } from '@/core/constants/theme';

import { AuthNavigator } from './auth-navigator';
import { SignupNavigator } from './signup-navigator';
import SplashCarouselScreen from '@/flows/splash-flow/splash-carousel-screen';
import HomeScreen from '@/flows/home-flow/home-screen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await getToken();
        if (token) {
          dispatch(
            loginSuccess({
              user: { id: '', email: '' } as any,
              token,
            }),
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Splash" component={SplashCarouselScreen} />
          <Stack.Screen name="AuthFlow" component={AuthNavigator} />
          <Stack.Screen name="SignupFlow" component={SignupNavigator} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
