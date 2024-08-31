import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider as PaperProvider} from 'react-native-paper';
import theme from './src/core/theme';

const App = () => {
  return (
    <>
    <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <PaperProvider theme={theme}>
        <AppNavigator />
      </PaperProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
