import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts } from '@/core/constants/theme';
import CameraIcon from '@/assets/images/camera.svg';

const SignupStep3Screen = () => {
  const navigation = useNavigation<any>();

  const handleAttach = () => {
    // TODO: open camera / image picker
  };

  const handleContinue = () => {
    navigation.navigate('Success');
  };

  return (
    <AuthLayout
      subHeader={<StepIndicator currentStep={3} totalSteps={4} />}
      header="Verification"
      footer={
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AppText style={styles.backArrow}>{'\u2190'}</AppText>
          </TouchableOpacity>
          <Button
            title="Continue"
            backgroundColor={Colors.secondary}
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </>
      }>
      <AppText style={styles.description}>
        Attached proof of Department of Agriculture registrations i.e. Florida
        Fresh, USDA Approved, USDA Organic
      </AppText>

      <TouchableOpacity style={styles.attachRow} onPress={handleAttach}>
        <AppText style={styles.attachText}>
          Attach proof of registration
        </AppText>
        <View style={styles.cameraButton}>
          <CameraIcon width={24} height={20} />
        </View>
      </TouchableOpacity>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'left',
  },
  attachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  attachText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.dark,
    flex: 1,
  },
  cameraButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: Colors.dark,
  },
  continueButton: {
    width: 180,
  },
});

export default SignupStep3Screen;
