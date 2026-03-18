import React, { forwardRef } from 'react';
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

const FormInput = forwardRef<TextInput, FormInputProps>(
  (
    {
      icon: Icon,
      rightText,
      rightTextColor = Colors.secondary,
      onRightTextPress,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <View style={styles.container}>
        {Icon && (
          <View style={styles.iconWrapper}>
            <Icon width={15} height={15} />
          </View>
        )}
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor={Colors.placeholder}
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
  },
);

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
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
