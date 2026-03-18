import React, { useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '@/ui/molecules/app-toast';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import SocialLoginButtons from '@/ui/molecules/social-login-buttons';
import { Colors } from '@/core/constants/theme';
import { AppDispatch, RootState } from '@/app/store';
import { loginUser } from '@/modules/auth/auth.service';
import { loginSchema } from '@/core/utils/schemas';
import EmailIcon from '@/assets/images/email.svg';
import LockIcon from '@/assets/images/lock.svg';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<TextInput>(null);

  const isFormFilled = email.trim() && password;

  const handleLogin = () => {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      showToast({ type: 'error', message: result.error.issues[0].message });
      return;
    }
    dispatch(loginUser({ email, password }));
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
          rightText="Forgot?"
          onRightTextPress={() => navigation.navigate('ForgotPassword')}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />
      </View>

      <Button
        title={loading ? 'Logging in...' : 'Login'}
        backgroundColor={Colors.secondary}
        onPress={handleLogin}
        disabled={loading || !isFormFilled}
        style={[styles.button, !isFormFilled && styles.buttonDisabled]}
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
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default LoginScreen;
