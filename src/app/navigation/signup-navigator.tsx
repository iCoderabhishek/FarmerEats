import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupStep1Screen from '@/flows/signup-flow/screens/signup-step-1-screen';
import SignupStep2Screen from '@/flows/signup-flow/screens/signup-step-2-screen';
import SignupStep3Screen from '@/flows/signup-flow/screens/signup-step-3-screen';
import SignupSuccessScreen from '@/flows/signup-flow/screens/signup-success-screen';

const Stack = createNativeStackNavigator();

export const SignupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Step1" component={SignupStep1Screen} />
      <Stack.Screen name="Step2" component={SignupStep2Screen} />
      <Stack.Screen name="Step3" component={SignupStep3Screen} />
      <Stack.Screen name="Success" component={SignupSuccessScreen} />
    </Stack.Navigator>
  );
};