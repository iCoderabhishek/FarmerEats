import React from 'react';
import { StyleSheet } from 'react-native';
import { Fonts } from '@/core/constants/theme';
import AppText from '@/ui/atoms/text';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <AppText style={styles.text}>
      Signup {currentStep} of {totalSteps}
    </AppText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'left',
  },
});

export default StepIndicator;
