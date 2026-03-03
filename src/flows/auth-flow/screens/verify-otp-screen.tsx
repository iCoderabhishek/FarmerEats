import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import OtpInput from '@/ui/molecules/otp-input';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import { Colors, Fonts } from '@/core/constants/theme';

const VerifyOtpScreen = () => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    navigation.navigate('ResetPassword');
  };

  const handleResendCode = () => {
    // TODO: resend OTP
  };

  return (
    <AuthLayout
      header="Verify OTP"
      descText="Remember your password?"
      linkText="Login"
      onLinkPress={() => navigation.navigate('Login')}>
      <OtpInput value={otp} onChange={setOtp} />

      <Button
        title="Submit"
        backgroundColor={Colors.secondary}
        onPress={handleSubmit}
        style={styles.button}
      />

      <TouchableOpacity
        onPress={handleResendCode}
        style={styles.resendContainer}>
        <AppText style={styles.resendText}>Resend Code</AppText>
      </TouchableOpacity>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 48,
  },
  resendContainer: {
    alignSelf: 'center',
    marginTop: 16,
  },
  resendText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.dark,
    textDecorationLine: 'underline',
  },
});

export default VerifyOtpScreen;
