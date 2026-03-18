import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts } from '@/core/constants/theme';
import ScreenWrapper from './screen-wrapper';
import AppText from '../atoms/text';

interface AuthLayoutProps {
  header: string;
  subHeader?: React.ReactNode;
  descText?: string;
  linkText?: string;
  onLinkPress?: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  header,
  subHeader,
  descText,
  linkText,
  onLinkPress,
  footer,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 20 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.appTitle}>FarmerEats</AppText>

        {subHeader && <View style={styles.subHeader}>{subHeader}</View>}

        <AppText
          style={[styles.header, subHeader ? styles.headerWithSub : null]}
        >
          {header}
        </AppText>

        {(descText || linkText) && (
          <View style={styles.descRow}>
            {descText && <AppText style={styles.descText}>{descText} </AppText>}
            {linkText && (
              <TouchableOpacity onPress={onLinkPress}>
                <AppText style={styles.linkText}>{linkText}</AppText>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.formArea}>{children}</View>
      </ScrollView>

      {footer && !keyboardVisible && (
        <View style={[styles.footer, { bottom: insets.bottom + 20 }]}>
          {footer}
        </View>
      )}
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
    color: Colors.textMuted,
  },
  linkText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.secondary,
  },
  subHeader: {
    marginTop: 40,
  },
  headerWithSub: {
    marginTop: 4,
  },
  formArea: {
    marginTop: 40,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});

export default AuthLayout;
