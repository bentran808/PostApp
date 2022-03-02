import React from 'react';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp
} from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddPostScreen from '../screens/AddPostScreen';
import ShowImageScreen from '../screens/ShowImageScreen';

type AddPostNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddPost'
>;

interface AddPostProps {
    navigation: AddPostNavigationProp;
}

const Stack = createNativeStackNavigator();
const HomeStack = ({navigation}: AddPostProps) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18
                },
                headerRight: () => (
                    <View>
                        <FontAwesome5.Button
                            name="plus"
                            size={22}
                            backgroundColor="#fff"
                            color="#2e64e5"
                            onPress={() => navigation.navigate('AddPost')}
                        />
                    </View>
                )
            }}
        />
        <Stack.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
                title: 'Add Post',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18
                },
                headerStyle: {
                    backgroundColor: '#2e64e515'
                }
            }}
        />
        <Stack.Screen
            name="ShowImage"
            component={ShowImageScreen}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
);

export default HomeStack;
