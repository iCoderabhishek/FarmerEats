import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/core/constants/theme';
import AppText from '../atoms/text';
import GoogleIcon from '@/assets/images/google.svg';
import AppleIcon from '@/assets/images/apple.svg';
import FacebookIcon from '@/assets/images/facebook.svg';

interface SocialLoginButtonsProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  onFacebookPress?: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onGooglePress,
  onApplePress,
  onFacebookPress,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.orText}>or login with</AppText>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onGooglePress}
          activeOpacity={0.7}>
          <GoogleIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onApplePress}
          activeOpacity={0.7}>
          <AppleIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onFacebookPress}
          activeOpacity={0.7}>
          <FacebookIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  orText: {
    fontFamily: Fonts.medium,
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
    marginTop: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  socialButton: {
    width: 96,
    height: 52,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SocialLoginButtons;
