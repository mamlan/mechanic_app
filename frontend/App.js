import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}
