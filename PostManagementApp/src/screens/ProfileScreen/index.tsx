import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../../constants/colors';
import { useAppDispatch } from '../../hooks';
import { authActions } from '../../redux/slices';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LoginProps {
    navigation: LoginNavigationProp;
}

const ProfileScreen = ({ navigation }: LoginProps) => {
    const dispatch = useAppDispatch();

    return (
        <View style={styles.body}>
            <Button
                mode="contained"
                color={colors.royalBlue}
                uppercase={false}
                onPress={() => {
                    dispatch(authActions.logout());
                    navigation.navigate('Login');
                }}
            >
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
