import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '@/flows/auth-flow/screens/login-screen';
// import ForgotPasswordScreen from '@/flows/auth-flow/screens/forgot-password-screen';
// import VerifyOtpScreen from '@/flows/auth-flow/screens/verify-otp-screen';
// import ResetPasswordScreen from '@/flows/auth-flow/screens/reset-password-screen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} /> */}
    </Stack.Navigator>
  );
};