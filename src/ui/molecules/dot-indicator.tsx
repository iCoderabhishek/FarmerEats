import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/core/constants/theme';

interface DotIndicatorProps {
  count: number;
  activeIndex: number;
}

const DotIndicator = ({ count, activeIndex }: DotIndicatorProps) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    backgroundColor: Colors.dark,
    borderRadius: 46,
  },
  activeDot: {
    width: 16.33,
    height: 7,
  },
  inactiveDot: {
    width: 7,
    height: 7,
  },
});

export default DotIndicator;
