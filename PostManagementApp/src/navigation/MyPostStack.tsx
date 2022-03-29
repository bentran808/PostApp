import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Screens } from 'constants/screens';
import AddPostScreen from 'screens/AddPostScreen';
import MyPostScreen from 'screens/MyPostScreen';
import ShowImageScreen from 'screens/ShowImageScreen';
import { colors } from 'theme/Colors';

const Stack = createNativeStackNavigator();
const MyPostStack = () => (
  <Stack.Navigator initialRouteName={Screens.MY_POST_SCREEN.name}>
    <Stack.Screen
      name={Screens.MY_POST_SCREEN.name}
      component={MyPostScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name={Screens.EDIT_POST_SCREEN.name}
      component={AddPostScreen}
      options={{
        title: 'Update a my post',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.royalBlue,
          fontSize: 18
        }
      }}
    />
    <Stack.Screen
      name={Screens.SHOW_IMAGE_SCREEN.name}
      component={ShowImageScreen}
      options={{
        headerTitle: ''
      }}
    />
  </Stack.Navigator>
);

export default MyPostStack;
