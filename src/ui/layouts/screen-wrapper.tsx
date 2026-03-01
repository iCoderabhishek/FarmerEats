import React from 'react';
import { View, StyleSheet, StatusBar, ViewProps } from 'react-native';
import { Colors } from '@/core/constants/theme';

interface ScreenWrapperProps extends ViewProps {
  backgroundColor?: string;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  backgroundColor = Colors.background,
  style,
  children,
  ...props
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]} {...props}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
