import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { store } from '@/app/store';
import { RootNavigator } from '@/app/navigation/root-navigator';

type Props = {
  children?: React.ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
        {children}
      </NavigationContainer>
      <Toast />
    </Provider>
  );
};
