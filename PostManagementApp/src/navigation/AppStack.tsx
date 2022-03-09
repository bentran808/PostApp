import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
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
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;
