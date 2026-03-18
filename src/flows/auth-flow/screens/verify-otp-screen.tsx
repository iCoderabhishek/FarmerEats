import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '@/ui/molecules/app-toast';
import AuthLayout from '@/ui/layouts/auth-layout';
import OtpInput from '@/ui/molecules/otp-input';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import { Colors, Fonts } from '@/core/constants/theme';
import { verifyOtp } from '@/modules/auth/auth.service';

const VerifyOtpScreen = () => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (otp.length < 6) {
      return;
    }
    setLoading(true);
    try {
      const data = await verifyOtp({ otp });
      if (data.success === 'true') {
        navigation.navigate('ResetPassword', { token: data.token });
      }
    } catch {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    showToast({ type: 'info', message: 'Code resent' });
  };

  return (
    <AuthLayout
      header="Verify OTP"
      descText="Remember your password?"
      linkText="Login"
      onLinkPress={() => navigation.navigate('Login')}
    >
      <OtpInput value={otp} onChange={setOtp} />

      <Button
        title={loading ? 'Verifying...' : 'Submit'}
        backgroundColor={Colors.secondary}
        onPress={handleSubmit}
        disabled={loading}
        style={styles.button}
      />

      <TouchableOpacity
        onPress={handleResendCode}
        style={styles.resendContainer}
      >
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
