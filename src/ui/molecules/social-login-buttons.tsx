import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/core/constants/theme';
import AppText from '../atoms/text';
import GoogleIcon from '@/assets/images/google.svg';
import AppleIcon from '@/assets/images/apple.svg';
import FacebookIcon from '@/assets/images/facebook.svg';

interface SocialLoginButtonsProps {
  label?: string;
  labelPosition?: 'top' | 'bottom';
  onGooglePress?: () => void;
  onApplePress?: () => void;
  onFacebookPress?: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  label = 'or login with',
  labelPosition = 'top',
  onGooglePress,
  onApplePress,
  onFacebookPress,
}) => {
  const labelEl = (
    <AppText
      style={[
        styles.orText,
        labelPosition === 'top' ? styles.labelTop : styles.labelBottom,
      ]}
    >
      {label}
    </AppText>
  );

  return (
    <View style={styles.container}>
      {labelPosition === 'top' && labelEl}
      <View
        style={[
          styles.buttonRow,
          labelPosition === 'bottom' && styles.buttonRowFirst,
        ]}
      >
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onGooglePress}
          activeOpacity={0.7}
        >
          <GoogleIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onApplePress}
          activeOpacity={0.7}
        >
          <AppleIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={onFacebookPress}
          activeOpacity={0.7}
        >
          <FacebookIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      {labelPosition === 'bottom' && labelEl}
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
    color: Colors.textMuted,
  },
  labelTop: {
    marginTop: 32,
  },
  labelBottom: {
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  buttonRowFirst: {
    marginTop: 0,
  },
  socialButton: {
    width: 96,
    height: 52,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.borderMuted,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SocialLoginButtons;
