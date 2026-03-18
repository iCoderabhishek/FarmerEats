import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ScreenWrapper from '@/ui/layouts/screen-wrapper';
import AppText from '@/ui/atoms/text';
import Button from '@/ui/atoms/button';
import { Colors, Fonts } from '@/core/constants/theme';
import { AppDispatch } from '@/app/store';
import { logoutUser } from '@/modules/auth/auth.service';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <AppText style={styles.title}>Welcome to FarmerEats</AppText>
        <AppText style={styles.subtitle}>You're logged in!</AppText>
        <Button
          title="Logout"
          backgroundColor={Colors.secondary}
          onPress={() => dispatch(logoutUser())}
          style={styles.button}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.dark,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textMuted,
    marginTop: 8,
  },
  button: {
    marginTop: 40,
    width: 200,
  },
});

export default HomeScreen;
