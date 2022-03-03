import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FormButton from '../components/FormButton';
import {CounterContext} from '../navigation/CounterContext';

type LoginNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

interface LoginProps {
    navigation: LoginNavigationProp;
}

const ProfileScreen = ({navigation}: LoginProps) => {
    const {logoutUser} = useContext(CounterContext);
    return (
        <View style={styles.body}>
            <FormButton
                title="Logout"
                onPress={() => {
                    logoutUser();
                    navigation.navigate('Login');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    }
});

export default ProfileScreen;
