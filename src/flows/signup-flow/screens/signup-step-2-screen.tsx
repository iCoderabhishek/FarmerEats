import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts, Spacing } from '@/core/constants/theme';
import { GlobalStrings } from '@/core/constants/strings';
import TagIcon from '@/assets/images/tag.svg';
import SmileIcon from '@/assets/images/smile.svg';
import HouseIcon from '@/assets/images/house.svg';
import LocationIcon from '@/assets/images/location.svg';

const SignupStep2Screen = () => {
  const navigation = useNavigation<any>();
  const [businessName, setBusinessName] = useState('');
  const [informalName, setInformalName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const handleContinue = () => {
    navigation.navigate('Step3');
  };

  return (
    <AuthLayout
      subHeader={<StepIndicator currentStep={2} totalSteps={4} />}
      header={GlobalStrings.farmInfo}
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
      <View style={styles.inputGroup}>
        <FormInput
          icon={TagIcon}
          placeholder={GlobalStrings.businessName}
          value={businessName}
          onChangeText={setBusinessName}
        />
        <FormInput
          icon={SmileIcon}
          placeholder={GlobalStrings.informalName}
          value={informalName}
          onChangeText={setInformalName}
        />
        <FormInput
          icon={HouseIcon}
          placeholder={GlobalStrings.streetAddress}
          value={streetAddress}
          onChangeText={setStreetAddress}
        />
        <FormInput
          icon={LocationIcon}
          placeholder={GlobalStrings.city}
          value={city}
          onChangeText={setCity}
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.stateSelector}
            onPress={() => {
              // TODO: open state picker
            }}
            activeOpacity={0.7}>
            <AppText
              style={[styles.stateText, !state && styles.statePlaceholder]}>
              {state || GlobalStrings.state}
            </AppText>
            <AppText style={styles.stateArrow}>{'\u25BE'}</AppText>
          </TouchableOpacity>
          <View style={styles.zipcodeWrapper}>
            <FormInput
              placeholder={GlobalStrings.enterZipcode}
              keyboardType="number-pad"
              value={zipcode}
              onChangeText={setZipcode}
            />
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    gap: Spacing.m,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.m,
  },
  stateSelector: {
    borderRadius: 8,
    backgroundColor: 'rgba(38, 28, 18, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.m,
    paddingVertical: 12, // Leave exact non-theme values if desired, or replace via spacing if it exists but I'll stick to theme vars that matched before like 16.
    width: 120,
  },
  stateText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.dark,
    flex: 1,
  },
  statePlaceholder: {
    color: 'rgba(38, 28, 18, 0.3)',
  },
  stateArrow: {
    fontSize: 14,
    color: Colors.dark,
  },
  zipcodeWrapper: {
    flex: 1,
  },
  backArrow: {
    fontSize: 24,
    color: Colors.dark,
  },
  continueButton: {
    width: 180,
  },
});

export default SignupStep2Screen;
