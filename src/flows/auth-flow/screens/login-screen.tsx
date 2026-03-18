import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import SocialLoginButtons from '@/ui/molecules/social-login-buttons';
import { Colors } from '@/core/constants/theme';
import EmailIcon from '@/assets/images/email.svg';
import LockIcon from '@/assets/images/lock.svg';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: dispatch login action
  };

  return (
    <AuthLayout
      header="Welcome back!"
      descText="New here?"
      linkText="Create account"
      onLinkPress={() => navigation.navigate('SignupFlow')}
    >
      <View style={styles.inputGroup}>
        <FormInput
          icon={EmailIcon}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <FormInput
          icon={LockIcon}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          rightText="Forgot?"
          onRightTextPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>

      <Button
        title="Login"
        backgroundColor={Colors.secondary}
        onPress={handleLogin}
        style={styles.button}
      />

      <SocialLoginButtons />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    gap: 24,
  },
  button: {
    marginTop: 48,
  },
});

export default LoginScreen;
