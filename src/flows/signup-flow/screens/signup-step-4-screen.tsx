import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '@/ui/layouts/auth-layout';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts } from '@/core/constants/theme';
import { AppDispatch, RootState } from '@/app/store';
import { registerUser } from '@/modules/signup/signup.service';

const DAYS = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'] as const;

const TIME_SLOTS = [
  '8:00am - 10:00am',
  '10:00am - 1:00pm',
  '1:00pm - 4:00pm',
  '4:00pm - 7:00pm',
  '7:00pm - 10:00pm',
] as const;

const SignupStep4Screen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.signup);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot],
    );
  };

  const handleSignup = async () => {
    const result = await dispatch(
      registerUser({ selectedDays, selectedSlots }),
    );
    if (result) {
      navigation.navigate('Success');
    }
  };

  return (
    <AuthLayout
      subHeader={<StepIndicator currentStep={4} totalSteps={4} />}
      header="Business Hours"
      footer={
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AppText style={styles.backArrow}>{'\u2190'}</AppText>
          </TouchableOpacity>
          <Button
            title={loading ? 'Signing up...' : 'Signup'}
            backgroundColor={Colors.secondary}
            onPress={handleSignup}
            disabled={loading}
            style={styles.signupButton}
          />
        </>
      }
    >
      <AppText style={styles.description}>
        Choose the hours your farm is open for pickups. This will allow
        customers to order deliveries.
      </AppText>

      <View style={styles.daysRow}>
        {DAYS.map(day => {
          const isSelected = selectedDays.includes(day);
          const isEnabled = ['M', 'T', 'W'].includes(day);
          return (
            <TouchableOpacity
              key={day}
              style={[
                styles.dayBox,
                isSelected && styles.dayBoxSelected,
                !isSelected && isEnabled && styles.dayBoxEnabled,
                !isSelected && !isEnabled && styles.dayBoxDisabled,
              ]}
              onPress={() => toggleDay(day)}
              activeOpacity={0.7}
            >
              <AppText
                style={[
                  styles.dayText,
                  isSelected && styles.dayTextSelected,
                  !isSelected && !isEnabled && styles.dayTextDisabled,
                ]}
              >
                {day}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.slotsGrid}>
        {TIME_SLOTS.map(slot => {
          const isSelected = selectedSlots.includes(slot);
          return (
            <TouchableOpacity
              key={slot}
              style={[
                styles.slotBox,
                isSelected && styles.slotBoxSelected,
                !isSelected && styles.slotBoxDefault,
              ]}
              onPress={() => toggleSlot(slot)}
              activeOpacity={0.7}
            >
              <AppText style={styles.slotText}>{slot}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
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
  daysRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
  },
  dayBox: {
    width: 37,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBoxSelected: {
    backgroundColor: Colors.secondary,
  },
  dayBoxEnabled: {
    backgroundColor: Colors.inputBackground,
  },
  dayBoxDisabled: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  dayText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.dark,
    textAlign: 'center',
  },
  dayTextSelected: {
    color: Colors.white,
  },
  dayTextDisabled: {
    color: Colors.placeholder,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },
  slotBox: {
    width: 160,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotBoxSelected: {
    backgroundColor: Colors.accent,
  },
  slotBoxDefault: {
    backgroundColor: Colors.inputBackground,
  },
  slotText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.dark,
    textAlign: 'center',
  },
  backArrow: {
    width: 26,
    height: 18,
    fontSize: 26,
    color: Colors.dark,
    lineHeight: 18,
  },
  signupButton: {
    width: 180,
  },
});

export default SignupStep4Screen;
