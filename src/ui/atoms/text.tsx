import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import { Fonts, Colors } from '@/core/constants/theme';

type TextVariant = 'heading' | 'body' | 'caption' | 'label';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
}

const AppText: React.FC<TextProps> = ({
  variant = 'body',
  style,
  ...props
}) => {
  return <RNText style={[styles[variant], style]} {...props} />;
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.black,
    textAlign: 'center',
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.dark,
    textAlign: 'center',
  },
  caption: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.dark,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.dark,
  },
});

export default AppText;
