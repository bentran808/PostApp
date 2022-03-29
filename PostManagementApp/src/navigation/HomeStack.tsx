import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Screens } from 'constants/screens';
import AddPostScreen from 'screens/AddPostScreen';
import HomeScreen from 'screens/HomeScreen';
import ShowImageScreen from 'screens/ShowImageScreen';
import { colors } from 'theme/Colors';

type HomeStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddPostScreen'>;

interface HomeStackProps {
  navigation: HomeStackNavigationProp;
}

const Stack = createNativeStackNavigator();
const HomeStack = ({ navigation }: HomeStackProps) => (
  <Stack.Navigator initialRouteName={Screens.HOME_SCREEN.name}>
    <Stack.Screen
      name={Screens.HOME_SCREEN.name}
      component={HomeScreen}
      options={{
        title: Screens.HOME_SCREEN.label,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.royalBlue,
          fontSize: 18
        },
        headerLeft: () => null,
        headerRight: () => (
          <View>
            <FontAwesome5.Button
              name="plus"
              size={22}
              backgroundColor={Colors.white}
              color={colors.royalBlue}
              onPress={() => navigation.navigate(Screens.ADD_POST_SCREEN.name as 'AddPostScreen')}
            />
          </View>
        )
      }}
    />
    <Stack.Screen
      name={Screens.ADD_POST_SCREEN.name}
      component={AddPostScreen}
      options={({ route }) => {
        const title = route.params ? 'Update a post' : 'Create a new post';

        return {
          title,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.royalBlue,
            fontSize: 18
          }
        };
      }}
    />
    <Stack.Screen
      name={Screens.SHOW_IMAGE_SCREEN.name}
      component={ShowImageScreen}
      options={{
        title: Screens.SHOW_IMAGE_SCREEN.label
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
