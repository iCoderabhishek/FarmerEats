import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import SocialLoginButtons from '@/ui/molecules/social-login-buttons';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts } from '@/core/constants/theme';
import PersonaIcon from '@/assets/images/persona.svg';
import EmailIcon from '@/assets/images/email.svg';
import PhoneIcon from '@/assets/images/phone.svg';
import LockIcon from '@/assets/images/lock.svg';

const SignupStep1Screen = () => {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleContinue = () => {
    navigation.navigate('Step2');
  };

  const handleLogin = () => {
    navigation.navigate('AuthFlow');
  };

  return (
    <AuthLayout
      subHeader={<StepIndicator currentStep={1} totalSteps={4} />}
      header="Welcome!"
      footer={
        <>
          <TouchableOpacity onPress={handleLogin}>
            <AppText style={styles.loginLink}>Login</AppText>
          </TouchableOpacity>
          <Button
            title="Continue"
            backgroundColor={Colors.secondary}
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </>
      }
    >
      <SocialLoginButtons label="or signup with" labelPosition="bottom" />

      <View style={styles.inputGroup}>
        <FormInput
          icon={PersonaIcon}
          placeholder="Full Name"
          autoCapitalize="words"
          value={fullName}
          onChangeText={setFullName}
        />
        <FormInput
          icon={EmailIcon}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          icon={PhoneIcon}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <FormInput
          icon={LockIcon}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <FormInput
          icon={LockIcon}
          placeholder="Re-enter Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    gap: 16,
    marginTop: 24,
  },
  loginLink: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.dark,
    textDecorationLine: 'underline',
  },
  continueButton: {
    width: 180,
  },
});

export default SignupStep1Screen;
