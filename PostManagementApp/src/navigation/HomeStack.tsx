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

type HomeStackNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddPost'
>;

interface HomeStackProps {
    navigation: HomeStackNavigationProp;
}

const Stack = createNativeStackNavigator();
const HomeStack = ({navigation}: HomeStackProps) => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18
                },
                headerLeft: () => null,
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
            options={({route}) => {
                const title = route.params
                    ? 'Update a post'
                    : 'Create a new post';

                return {
                    title,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#2e64e5',
                        fontSize: 18
                    }
                };
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
