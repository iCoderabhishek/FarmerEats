import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Colors, Fonts } from '@/core/constants/theme';
import AppText from './text';

interface FormInputProps extends TextInputProps {
  icon?: React.FC<SvgProps>;
  rightText?: string;
  rightTextColor?: string;
  onRightTextPress?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  icon: Icon,
  rightText,
  rightTextColor = Colors.secondary,
  onRightTextPress,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {Icon && (
        <View style={styles.iconWrapper}>
          <Icon width={15} height={15} />
        </View>
      )}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="rgba(38, 28, 18, 0.3)"
        {...props}
      />
      {rightText && (
        <TouchableOpacity onPress={onRightTextPress} hitSlop={8}>
          <AppText style={[styles.rightText, { color: rightTextColor }]}>
            {rightText}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(38, 28, 18, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconWrapper: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.dark,
    paddingVertical: 0,
  },
  rightText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
});

export default FormInput;
