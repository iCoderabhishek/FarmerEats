import React, { useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Fonts } from '@/core/constants/theme';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 5, value, onChange }) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={text =>
          onChange(text.replace(/[^0-9]/g, '').slice(0, length))
        }
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
      />
      <Pressable
        style={styles.boxRow}
        onPress={() => inputRef.current?.focus()}>
        {Array.from({ length }, (_, index) => (
          <View
            key={index}
            style={[
              styles.box,
              value.length === index && styles.activeBox,
            ]}>
            <Text style={styles.boxText}>{value[index] || ''}</Text>
          </View>
        ))}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: 58,
    height: 59,
    borderRadius: 8,
    backgroundColor: 'rgba(38, 28, 18, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBox: {
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  boxText: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    color: Colors.dark,
  },
});

export default OtpInput;
