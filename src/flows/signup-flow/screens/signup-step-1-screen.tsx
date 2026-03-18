import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { showToast } from '@/ui/molecules/app-toast';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import SocialLoginButtons from '@/ui/molecules/social-login-buttons';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts } from '@/core/constants/theme';
import { AppDispatch } from '@/app/store';
import { setAccountInfo } from '@/modules/signup/signup.slice';
import { signupStep1Schema } from '@/core/utils/schemas';
import PersonaIcon from '@/assets/images/persona.svg';
import EmailIcon from '@/assets/images/email.svg';
import PhoneIcon from '@/assets/images/phone.svg';
import LockIcon from '@/assets/images/lock.svg';

const SignupStep1Screen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const isFormFilled =
    fullName.trim() &&
    email.trim() &&
    phoneNumber.trim() &&
    password &&
    confirmPassword;

  const handleContinue = () => {
    const result = signupStep1Schema.safeParse({
      fullName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    });
    if (!result.success) {
      showToast({ type: 'error', message: result.error.issues[0].message });
      return;
    }
    dispatch(setAccountInfo({ fullName, email, phoneNumber, password }));
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
            disabled={!isFormFilled}
            style={[
              styles.continueButton,
              !isFormFilled && styles.buttonDisabled,
            ]}
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
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <FormInput
          ref={emailRef}
          icon={EmailIcon}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
        <FormInput
          ref={phoneRef}
          icon={PhoneIcon}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <FormInput
          ref={passwordRef}
          icon={LockIcon}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <FormInput
          ref={confirmPasswordRef}
          icon={LockIcon}
          placeholder="Re-enter Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          returnKeyType="done"
          onSubmitEditing={handleContinue}
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
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default SignupStep1Screen;
