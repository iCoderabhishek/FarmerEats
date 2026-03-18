import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import { Colors } from '@/core/constants/theme';
import PhoneIcon from '@/assets/images/phone.svg';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendCode = () => {
    navigation.navigate('VerifyOtp');
  };

  return (
    <AuthLayout
      header="Forgot Password?"
      descText="Remember your password?"
      linkText="Login"
      onLinkPress={() => navigation.navigate('Login')}
    >
      <FormInput
        icon={PhoneIcon}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Button
        title="Send Code"
        backgroundColor={Colors.secondary}
        onPress={handleSendCode}
        style={styles.button}
      />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 48,
  },
});

export default ForgotPasswordScreen;
