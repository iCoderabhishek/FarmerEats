import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import AuthLayout from '@/ui/layouts/auth-layout';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts } from '@/core/constants/theme';
import { AppDispatch } from '@/app/store';
import { setMediaUri } from '@/modules/signup/signup.slice';
import CameraIcon from '@/assets/images/camera.svg';

const SignupStep3Screen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [fileName, setFileName] = useState<string | null>(null);

  const handleAttach = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      if (result[0]) {
        setFileName(result[0].name);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error(err);
      }
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    dispatch(setMediaUri(null));
  };

  const handleContinue = () => {
    dispatch(setMediaUri(fileName));
    navigation.navigate('Step4');
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
            title="Submit"
            backgroundColor={Colors.secondary}
            onPress={handleContinue}
            style={styles.continueButton}
          />
        </>
      }
    >
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

      {fileName && (
        <View style={styles.fileContainer}>
          <AppText style={styles.fileText} numberOfLines={1}>
            {fileName}
          </AppText>
          <TouchableOpacity onPress={handleRemoveFile} hitSlop={8}>
            <AppText style={styles.removeIcon}>{'\u00D7'}</AppText>
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
    color: Colors.textMuted,
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
  fileContainer: {
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 40,
  },
  fileText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.dark,
    textDecorationLine: 'underline',
    flex: 1,
  },
  removeIcon: {
    fontSize: 20,
    color: Colors.dark,
    marginLeft: 8,
  },
  backArrow: {
    width: 26,
    height: 18,
    fontSize: 26,
    color: Colors.dark,
    lineHeight: 18,
  },
  continueButton: {
    width: 180,
  },
});

export default SignupStep3Screen;
