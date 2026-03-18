import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '@/ui/layouts/auth-layout';
import Button from '@/ui/atoms/button';
import AppText from '@/ui/atoms/text';
import StepIndicator from '../components/step-indicator';
import { Colors, Fonts, Spacing } from '@/core/constants/theme';
import { GlobalStrings } from '@/core/constants/strings';
import {
    DAYS,
    DURATIONS,
    getDefaultSchedule,
    toggleDurationInSchedule,
} from '../helpers/signup-helpers';

const SignupStep4Screen = () => {
    const navigation = useNavigation<any>();
    const [activeDay, setActiveDay] = useState('W');
    const [schedule, setSchedule] = useState<Record<string, string[]>>(
        getDefaultSchedule()
    );

    const handleDayPress = (day: string) => {
        setActiveDay(day);
    };

    const handleDurationToggle = (duration: string) => {
        setSchedule((prev) =>
            toggleDurationInSchedule(prev, activeDay, duration)
        );
    };

    const handleSignup = () => {
        navigation.navigate('Success');
    };

    const currentDaySchedule = schedule[activeDay] || [];

    return (
        <AuthLayout
            subHeader={<StepIndicator currentStep={4} totalSteps={4} />}
            header={GlobalStrings.businessHours}
            footer={
                <>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AppText style={styles.backArrow}>{'\u2190'}</AppText>
                    </TouchableOpacity>
                    <Button
                        title={GlobalStrings.signup}
                        backgroundColor={Colors.secondary}
                        onPress={handleSignup}
                        style={styles.continueButton}
                    />
                </>
            }>
            <AppText style={styles.description}>
                {GlobalStrings.businessHoursDesc}
            </AppText>

            <View style={styles.daysContainer}>
                {DAYS.map((day) => {
                    const isSelected = day === activeDay;
                    const hasHours = schedule[day] && schedule[day].length > 0;

                    return (
                        <TouchableOpacity
                            key={day}
                            onPress={() => handleDayPress(day)}
                            style={[
                                styles.dayBox,
                                isSelected && styles.dayBoxSelected,
                                !isSelected && hasHours && styles.dayBoxEnabled,
                                !isSelected && !hasHours && styles.dayBoxDisabled,
                            ]}>
                            <AppText
                                style={[
                                    styles.dayText,
                                    isSelected && styles.dayTextSelected,
                                    !isSelected && hasHours && styles.dayTextEnabled,
                                    !isSelected && !hasHours && styles.dayTextDisabled,
                                ]}>
                                {day}
                            </AppText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.durationContainer}>
                {DURATIONS.map((duration) => {
                    const isSelected = currentDaySchedule.includes(duration);

                    return (
                        <TouchableOpacity
                            key={duration}
                            onPress={() => handleDurationToggle(duration)}
                            style={[
                                styles.durationBox,
                                isSelected ? styles.durationBoxSelected : styles.durationBoxUnselected,
                            ]}>
                            <AppText
                                style={[
                                    styles.durationText,
                                    isSelected ? styles.durationTextSelected : styles.durationTextUnselected,
                                ]}>
                                {duration}
                            </AppText>
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
        color: 'rgba(0, 0, 0, 0.3)',
        textAlign: 'left',
        marginBottom: Spacing.xl,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xl,
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
        backgroundColor: 'rgba(38, 28, 18, 0.08)',
    },
    dayBoxDisabled: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: 'rgba(38, 28, 18, 0.2)', // Approximate border color for visibility
    },
    dayText: {
        fontFamily: Fonts.regular,
        fontSize: 16,
    },
    dayTextSelected: {
        color: Colors.white,
    },
    dayTextEnabled: {
        color: Colors.dark,
    },
    dayTextDisabled: {
        color: 'rgba(38, 28, 18, 0.4)',
    },
    durationContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    durationBox: {
        width: '48%',
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12, // specific non-theme matching grid style ok, can optionally use Spacing.s/Spacing.m
    },
    durationBoxSelected: {
        backgroundColor: Colors.accent,
    },
    durationBoxUnselected: {
        backgroundColor: 'rgba(38, 28, 18, 0.08)',
    },
    durationText: {
        fontFamily: Fonts.regular,
        fontSize: 14,
    },
    durationTextSelected: {
        color: Colors.dark,
    },
    durationTextUnselected: {
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

export default SignupStep4Screen;
