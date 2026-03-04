import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts, Spacing } from '@/core/constants/theme';
import { GlobalStrings } from '@/core/constants/strings';
import CameraIcon from '@/assets/images/camera.svg';

const SignupStep3Screen = () => {
  const navigation = useNavigation<any>();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleAttach = () => {
    // TODO: open camera / image picker
    setSelectedFile('usda_registration.pdf');
  };

  const handleContinue = () => {
    navigation.navigate('Step4');
  };

  return (
    <AuthLayout
      subHeader={<StepIndicator currentStep={3} totalSteps={4} />}
      header={GlobalStrings.verification}
      footer={
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AppText style={styles.backArrow}>{'\u2190'}</AppText>
          </TouchableOpacity>
          <Button
            title={GlobalStrings.continue}
            backgroundColor={Colors.secondary}
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </>
      }>
      <AppText style={styles.description}>
        {GlobalStrings.attachedProofDesc}
      </AppText>

      <TouchableOpacity style={styles.attachRow} onPress={handleAttach}>
        <AppText style={styles.attachText}>
          {GlobalStrings.attachProof}
        </AppText>
        <View style={styles.cameraButton}>
          <CameraIcon width={24} height={20} />
        </View>
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.bannerContainer}>
          <AppText style={styles.bannerText}>{selectedFile}</AppText>
          <TouchableOpacity onPress={() => setSelectedFile(null)}>
            <AppText style={styles.closeIcon}>{'\u2573'}</AppText>
          </TouchableOpacity>
        </View>
      )}
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
    marginTop: Spacing.xl,
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
  bannerContainer: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    marginTop: Spacing.xxxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.m,
  },
  bannerText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    textDecorationLine: 'underline',
    color: Colors.dark,
  },
  closeIcon: {
    fontSize: 13,
    color: Colors.dark,
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
