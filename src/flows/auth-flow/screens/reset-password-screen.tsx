import React, { useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showToast } from '@/ui/molecules/app-toast';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import { Colors } from '@/core/constants/theme';
import { resetPassword } from '@/modules/auth/auth.service';
import { resetPasswordSchema } from '@/core/utils/schemas';
import LockIcon from '@/assets/images/lock.svg';

const ResetPasswordScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const token = route.params?.token ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const confirmRef = useRef<TextInput>(null);

  const isFormFilled = newPassword && confirmPassword;

  const handleSubmit = async () => {
    const result = resetPasswordSchema.safeParse({
      newPassword,
      confirmPassword,
    });
    if (!result.success) {
      showToast({ type: 'error', message: result.error.issues[0].message });
      return;
    }
    setLoading(true);
    try {
      const data = await resetPassword({
        token,
        password: newPassword,
        cpassword: confirmPassword,
      });
      if (data.success === 'true') {
        showToast({ type: 'success', message: data.message });
        navigation.navigate('Login');
      }
    } catch {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      header="Reset Password"
      descText="Remember your password?"
      linkText="Login"
      onLinkPress={() => navigation.navigate('Login')}
    >
      <View style={styles.inputGroup}>
        <FormInput
          icon={LockIcon}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          returnKeyType="next"
          onSubmitEditing={() => confirmRef.current?.focus()}
        />
        <FormInput
          ref={confirmRef}
          icon={LockIcon}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>

      <Button
        title={loading ? 'Submitting...' : 'Submit'}
        backgroundColor={Colors.secondary}
        onPress={handleSubmit}
        disabled={loading || !isFormFilled}
        style={[styles.button, !isFormFilled && styles.buttonDisabled]}
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
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default ResetPasswordScreen;
