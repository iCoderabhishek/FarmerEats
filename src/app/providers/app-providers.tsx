import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from '@/app/store';
import { RootNavigator } from '@/app/navigation/root-navigator';
import AppToast from '@/ui/molecules/app-toast';

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
      <AppToast />
    </Provider>
  );
};
