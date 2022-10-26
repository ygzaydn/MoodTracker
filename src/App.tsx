import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigator from './screens/BottomTabs.navigator';
import { AppProvider } from './App.provider';
import SplashScreen from 'react-native-splash-screen';

import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App: React.FC = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
