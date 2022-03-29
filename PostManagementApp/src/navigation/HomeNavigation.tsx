import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screens } from 'constants/screens';
import ProfileScreen from 'screens/ProfileScreen';
import { colors } from 'theme/Colors';
import HomeStack from './HomeStack';
import MyPostStack from './MyPostStack';

const Tab = createBottomTabNavigator();
const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.HOME_STACK.name}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 40 },
        tabBarActiveTintColor: colors.royalBlue
      }}
    >
      <Tab.Screen
        name={Screens.HOME_STACK.name}
        component={HomeStack}
        options={{
          tabBarLabel: Screens.HOME_STACK.label,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={Screens.MY_POST_STACK.name}
        component={MyPostStack}
        options={{
          tabBarLabel: Screens.MY_POST_STACK.label,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-text" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={Screens.PROFILE_STACK.name}
        component={ProfileScreen}
        options={{
          tabBarLabel: Screens.PROFILE_STACK.label,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
