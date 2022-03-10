import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { Tabs } from '../constants/screens';
import MyPostScreen from '../screens/MyPostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();
const HomeNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName={Tabs.HOME}
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 40 },
                tabBarActiveTintColor: colors.royalBlue
            }}
        >
            <Tab.Screen
                name={Tabs.HOME}
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-outline" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name={Tabs.MY_POST}
                component={MyPostScreen}
                options={{
                    tabBarLabel: 'My Post',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="format-list-text" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name={Tabs.PROFILE}
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-settings" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeNavigation;
