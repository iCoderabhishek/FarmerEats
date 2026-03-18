import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '@/core/constants/theme';
import AppText from '@/ui/atoms/text';

type ToastType = 'error' | 'success' | 'info';

interface ToastData {
  type: ToastType;
  message: string;
}

let showFn: ((data: ToastData) => void) | null = null;

export const showToast = (data: ToastData) => {
  showFn?.(data);
};

const BACKGROUND: Record<ToastType, string> = {
  error: Colors.secondary,
  success: Colors.primary,
  info: Colors.dark,
};

const AUTO_HIDE_MS = 3000;

const AppToast = () => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [toast, setToast] = React.useState<ToastData | null>(null);

  const hide = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setToast(null));
  };

  const show = (data: ToastData) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setToast(data);
    translateY.setValue(-100);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    timer.current = setTimeout(hide, AUTO_HIDE_MS);
  };

  useEffect(() => {
    showFn = show;
    return () => {
      showFn = null;
    };
  });

  if (!toast) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: BACKGROUND[toast.type],
          transform: [{ translateY }],
        },
      ]}
    >
      <AppText style={styles.message} numberOfLines={2}>
        {toast.message}
      </AppText>
      <TouchableOpacity onPress={hide} hitSlop={8}>
        <AppText style={styles.dismiss}>{'\u00D7'}</AppText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  message: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.white,
  },
  dismiss: {
    fontSize: 20,
    color: Colors.white,
    marginLeft: 12,
  },
});

export default AppToast;
