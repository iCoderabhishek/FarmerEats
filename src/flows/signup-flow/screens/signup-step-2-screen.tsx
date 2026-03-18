import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { showToast } from '@/ui/molecules/app-toast';
import AuthLayout from '@/ui/layouts/auth-layout';
import FormInput from '@/ui/atoms/input';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import StatePicker from '@/ui/molecules/state-picker';
import StepIndicator from '../components/step-indicator';
import { Colors } from '@/core/constants/theme';
import { AppDispatch } from '@/app/store';
import { setFarmInfo } from '@/modules/signup/signup.slice';
import { signupStep2Schema } from '@/core/utils/schemas';
import TagIcon from '@/assets/images/tag.svg';
import SmileIcon from '@/assets/images/smile.svg';
import HouseIcon from '@/assets/images/house.svg';
import LocationIcon from '@/assets/images/location.svg';

const SignupStep2Screen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [businessName, setBusinessName] = useState('');
  const [informalName, setInformalName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const informalRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const zipcodeRef = useRef<TextInput>(null);

  const isFormFilled =
    businessName.trim() &&
    informalName.trim() &&
    streetAddress.trim() &&
    city.trim() &&
    state &&
    zipcode.trim();

  const handleContinue = () => {
    const result = signupStep2Schema.safeParse({
      businessName,
      informalName,
      streetAddress,
      city,
      state,
      zipcode,
    });
    if (!result.success) {
      showToast({ type: 'error', message: result.error.issues[0].message });
      return;
    }
    dispatch(
      setFarmInfo({
        businessName,
        informalName,
        streetAddress,
        city,
        state,
        zipcode,
      }),
    );
    navigation.navigate('Step3');
  };

  return (
    <AuthLayout
      subHeader={<StepIndicator currentStep={2} totalSteps={4} />}
      header="Farm Info"
      footer={
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AppText style={styles.backArrow}>{'\u2190'}</AppText>
          </TouchableOpacity>
          <Button
            title="Continue"
            backgroundColor={Colors.secondary}
            onPress={handleContinue}
            disabled={!isFormFilled}
            style={[
              styles.continueButton,
              !isFormFilled && styles.buttonDisabled,
            ]}
          />
        </>
      }
    >
      <View style={styles.inputGroup}>
        <FormInput
          icon={TagIcon}
          placeholder="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
          returnKeyType="next"
          onSubmitEditing={() => informalRef.current?.focus()}
        />
        <FormInput
          ref={informalRef}
          icon={SmileIcon}
          placeholder="Informal Name"
          value={informalName}
          onChangeText={setInformalName}
          returnKeyType="next"
          onSubmitEditing={() => streetRef.current?.focus()}
        />
        <FormInput
          ref={streetRef}
          icon={HouseIcon}
          placeholder="Street Address"
          value={streetAddress}
          onChangeText={setStreetAddress}
          returnKeyType="next"
          onSubmitEditing={() => cityRef.current?.focus()}
        />
        <FormInput
          ref={cityRef}
          icon={LocationIcon}
          placeholder="City"
          value={city}
          onChangeText={setCity}
          returnKeyType="next"
          onSubmitEditing={() => zipcodeRef.current?.focus()}
        />
        <View style={styles.row}>
          <StatePicker value={state} onSelect={setState} />
          <View style={styles.zipcodeWrapper}>
            <FormInput
              ref={zipcodeRef}
              placeholder="Enter Zipcode"
              keyboardType="number-pad"
              value={zipcode}
              onChangeText={setZipcode}
              returnKeyType="done"
              onSubmitEditing={handleContinue}
            />
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  zipcodeWrapper: {
    flex: 1,
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
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default SignupStep2Screen;
