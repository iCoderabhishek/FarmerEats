import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '@/ui/layouts/screen-wrapper';
import AppText from '@/ui/atoms/text';
import Button from '@/ui/atoms/button';
import { Colors, Fonts } from '@/core/constants/theme';
import { AppDispatch, RootState } from '@/app/store';
import { loginSuccess } from '@/modules/auth/auth.slice';
import { resetSignup } from '@/modules/signup/signup.slice';
import { getToken } from '@/core/storage/token-storage';
import CheckIcon from '@/assets/images/check.svg';

const SignupSuccessScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const signup = useSelector((state: RootState) => state.signup);

  const handleGotIt = async () => {
    const token = (await getToken()) ?? '';
    dispatch(
      loginSuccess({
        user: {
          id: '',
          email: signup.email,
          fullName: signup.fullName,
          phoneNumber: signup.phoneNumber,
          businessName: signup.businessName,
          informalName: signup.informalName,
          streetAddress: signup.streetAddress,
          city: signup.city,
          zipcode: signup.zipcode,
          mediaUri: signup.mediaUri,
          businessHours: signup.businessHours,
        },
        token,
      }),
    );
    dispatch(resetSignup());
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <CheckIcon width={121} height={81} />
          <AppText style={styles.title}>You're all done!</AppText>
          <AppText style={styles.description}>
            Hang tight! We are currently reviewing your account and will follow
            up with you in 2-3 business days. In the meantime, you can setup
            your inventory.
          </AppText>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          <Button
            title="Got it!"
            backgroundColor={Colors.secondary}
            onPress={handleGotIt}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.dark,
    textAlign: 'center',
    marginTop: 32,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.dark,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
});

export default SignupSuccessScreen;
