import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import { Colors } from '@/core/constants/theme';
import LockIcon from '@/assets/images/lock.svg';

const ResetPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    // TODO: dispatch reset password action
    navigation.navigate('Login');
  };

  return (
    <AuthLayout
      header="Reset Password"
      descText="Remember your password?"
      linkText="Login"
      onLinkPress={() => navigation.navigate('Login')}>
      <View style={styles.inputGroup}>
        <FormInput
          icon={LockIcon}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <FormInput
          icon={LockIcon}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Button
        title="Submit"
        backgroundColor={Colors.secondary}
        onPress={handleSubmit}
        style={styles.button}
      />
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

export default ResetPasswordScreen;
