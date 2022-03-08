import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppContext} from '../navigation/AppContext';
import {Button} from 'react-native-paper';
import {colors} from '../constants/colors';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LoginProps {
    navigation: LoginNavigationProp;
}

const ProfileScreen = ({navigation}: LoginProps) => {
    const {logoutUser} = useContext(AppContext);
    return (
        <View style={styles.body}>
            <Button
                mode="contained"
                color={colors.royalBlue}
                uppercase={false}
                onPress={() => {
                    logoutUser();
                    navigation.navigate('Login');
                }}>
                Logout
            </Button>
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
