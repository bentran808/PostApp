// In App.js in a new project

import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
    createNativeStackNavigator,
    NativeStackNavigationProp
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FormButton from './components/FormButton';
import FormInput from './components/FormInput';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
};

type LoginNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;
interface LoginProps {
    navigation: LoginNavigationProp;
}

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="HomeTab">
            <Tab.Screen
                name="HomeTab"
                component={Home}
                options={{
                    tabBarLabel: 'Home'
                }}
            />
            <Tab.Screen
                name="MyPost"
                component={MyPost}
                options={{
                    tabBarLabel: 'My Post'
                }}
            />
        </Tab.Navigator>
    );
};

const LoginScreen = ({navigation}: LoginProps) => {
    const [email, setEmail] = React.useState('');
    return (
        <View style={styles.body}>
            <Text style={styles.text}>Login Screen</Text>
            <FormInput
                iconType="user"
                value={email}
                onChangeText={userEmail => setEmail(userEmail)}
                placeholderText="Email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
            />
            <FormInput
                iconType="lock"
                value={email}
                onChangeText={userEmail => setEmail(userEmail)}
                placeholderText="Password"
                secureTextEntry={true}
            />
            <FormButton
                title="Login"
                onPress={() => {
                    navigation.navigate('Home');
                }}
            />
        </View>
    );
};

const Home = () => (
    <View style={styles.body}>
        <Text style={styles.text}>Home Tab</Text>
    </View>
);

const MyPost = () => (
    <View style={styles.body}>
        <Text style={styles.text}>My Post Tab</Text>
    </View>
);

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
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
