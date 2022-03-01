import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AddPostScreen from './screens/AddPostScreen';
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#2e64e5'
            }}>
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="MyPost"
                component={MyPost}
                options={{
                    tabBarLabel: 'My Post',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons
                            name="format-list-text"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

// const Home = () => {
//     React.useEffect(() => {
//         axios
//             .get('http://localhost:3000/api/posts', {
//                 headers: {
//                     Authorization:
//                         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE2NDYxMjY5MTQsImV4cCI6MTY0NjEzMDUxNH0.deSzs6ZSarEnzsiXYk7g2VO1BWyaAZMgKPhWDbHDcqE',
//                     'Access-Control-Allow-Origin': '*',
//                     'Access-Control-Allow-Methods':
//                         'GET,PUT,POST,DELETE,PATCH,OPTIONS'
//                 }
//             })
//             .then(function (response) {
//                 console.log(response);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     });

//     return (
//         <View style={styles.body}>
//             <Text style={styles.text}>Home Tab</Text>
//         </View>
//     );
// };

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
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#2e64e515'
                }
            }}
        />
    </Stack.Navigator>
);

const MyPost = () => (
    <View style={styles.body}>
        <Text style={styles.text}>My Post Tab</Text>
    </View>
);

type AddPostNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'AddPost'
>;

interface AddPostProps {
    navigation: AddPostNavigationProp;
}

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={TabsNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default App;
