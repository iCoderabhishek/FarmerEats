import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Fonts } from '@/core/constants/theme';
import { US_STATES } from '@/core/constants/us-states';
import AppText from '@/ui/atoms/text';

interface StatePickerProps {
  value: string;
  onSelect: (state: string) => void;
}

const StatePicker: React.FC<StatePickerProps> = ({ value, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSelect = (state: string) => {
    onSelect(state);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <AppText
          style={[styles.selectorText, !value && styles.placeholder]}
          numberOfLines={1}
        >
          {value || 'State'}
        </AppText>
        <AppText style={styles.arrow}>{'\u25BE'}</AppText>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.header}>
              <AppText style={styles.title}>Select State</AppText>
              <TouchableOpacity onPress={() => setVisible(false)} hitSlop={8}>
                <AppText style={styles.close}>{'\u00D7'}</AppText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={US_STATES}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, item === value && styles.itemSelected]}
                  onPress={() => handleSelect(item)}
                >
                  <AppText
                    style={[
                      styles.itemText,
                      item === value && styles.itemTextSelected,
                    ]}
                  >
                    {item}
                  </AppText>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: 120,
  },
  selectorText: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.dark,
    flex: 1,
  },
  placeholder: {
    color: Colors.placeholder,
  },
  arrow: {
    fontSize: 19,
    color: Colors.dark,
    marginLeft: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '60%',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBackground,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
    color: Colors.dark,
  },
  close: {
    fontSize: 24,
    color: Colors.dark,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  itemSelected: {
    backgroundColor: Colors.inputBackground,
  },
  itemText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.dark,
  },
  itemTextSelected: {
    fontFamily: Fonts.medium,
    color: Colors.secondary,
  },
});

export default StatePicker;
