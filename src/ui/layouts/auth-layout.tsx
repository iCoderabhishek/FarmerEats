import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts } from '@/core/constants/theme';
import ScreenWrapper from './screen-wrapper';
import AppText from '../atoms/text';

interface AuthLayoutProps {
  header: string;
  descText?: string;
  linkText?: string;
  onLinkPress?: () => void;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  header,
  descText,
  linkText,
  onLinkPress,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <AppText style={styles.appTitle}>FarmerEats</AppText>

        <AppText style={styles.header}>{header}</AppText>

        {(descText || linkText) && (
          <View style={styles.descRow}>
            {descText && (
              <AppText style={styles.descText}>{descText} </AppText>
            )}
            {linkText && (
              <TouchableOpacity onPress={onLinkPress}>
                <AppText style={styles.linkText}>{linkText}</AppText>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.formArea}>{children}</View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  appTitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.black,
    textAlign: 'left',
  },
  header: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.dark,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 90,
  },
  descRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  descText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.3)',
  },
  linkText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.secondary,
  },
  formArea: {
    marginTop: 40,
  },
});

export default AuthLayout;