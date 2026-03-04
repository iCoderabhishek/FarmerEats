import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import { Colors, Fonts, Spacing } from '@/core/constants/theme';
import { GlobalStrings } from '@/core/constants/strings';
import TickIcon from '@/assets/images/tick.svg';

const SignupSuccessScreen = () => {
  const navigation = useNavigation();

  const handleGotIt = () => {
    // Reset to auth or main app flow
    // For now we can just navigate to login or home if the routes existed, or stay here.
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <TickIcon width={120} height={80} />
        </View>

        <AppText style={styles.title}>{GlobalStrings.successTitle}</AppText>

        <AppText style={styles.description}>
          {GlobalStrings.successDesc}
        </AppText>
      </View>

      <View style={styles.footerContainer}>
        <Button
          title={GlobalStrings.gotIt}
          backgroundColor={Colors.secondary}
          onPress={handleGotIt}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.xxl,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.dark,
    marginBottom: Spacing.l,
    textAlign: 'center',
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    width: '100%',
    maxWidth: 326,
  },
  footerContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.l,
  },
});

export default SignupSuccessScreen;