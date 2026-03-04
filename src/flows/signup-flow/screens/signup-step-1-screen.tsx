import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import SocialLoginButtons from '@/ui/molecules/social-login-buttons';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts, Spacing } from '@/core/constants/theme';
import { GlobalStrings } from '@/core/constants/strings';
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
      header={GlobalStrings.welcome}
      footer={
        <>
          <TouchableOpacity onPress={handleLogin}>
            <AppText style={styles.loginLink}>{GlobalStrings.login}</AppText>
          </TouchableOpacity>
          <Button
            title={GlobalStrings.continue}
            backgroundColor={Colors.secondary}
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </>
      }>
      <SocialLoginButtons label={GlobalStrings.orSignupWith} labelPosition="bottom" />

      <View style={styles.inputGroup}>
        <FormInput
          icon={PersonaIcon}
          placeholder={GlobalStrings.fullName}
          autoCapitalize="words"
          value={fullName}
          onChangeText={setFullName}
        />
        <FormInput
          icon={EmailIcon}
          placeholder={GlobalStrings.emailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          icon={PhoneIcon}
          placeholder={GlobalStrings.phoneNumber}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <FormInput
          icon={LockIcon}
          placeholder={GlobalStrings.password}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <FormInput
          icon={LockIcon}
          placeholder={GlobalStrings.reEnterPassword}
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
    gap: Spacing.m,
    marginTop: Spacing.l,
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
