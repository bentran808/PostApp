import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Screens } from 'constants/screens';
import LoginScreen from 'screens/LoginScreen';
import HomeNavigation from './HomeNavigation';

const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name={Screens.LOGIN.name} component={LoginScreen} />
        <Stack.Screen name={Screens.HOME.name} component={HomeNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
