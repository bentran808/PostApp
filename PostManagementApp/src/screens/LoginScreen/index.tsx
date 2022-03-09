import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Paragraph, Portal, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authActions } from '../../redux/slices';

// Utilities
import { windowWidth } from '../../utils/Dimensions';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
interface LoginProps {
    navigation: LoginNavigationProp;
}

const LoginScreen = ({ navigation }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState<unknown>();
    const dispatch = useAppDispatch();
    const disableButton = !email || !password;
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('Home');
            setEmail('');
            setPassword('');
        }
    }, [isLoggedIn, navigation]);

    const handleLogin = async () => {
        dispatch(authActions.login(`email=${email}&password=${password}`));
    };

    return (
        <>
            <View style={styles.container}>
                <Ionicons name="logo-react" size={150} color="#0ff" style={styles.textCenter} />
                <TextInput
                    mode="outlined"
                    activeOutlineColor={colors.royalBlue}
                    label="Email"
                    value={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={styles.marginBottom}
                />
                <TextInput
                    mode="outlined"
                    activeOutlineColor={colors.royalBlue}
                    label="Password"
                    secureTextEntry={hidden}
                    right={
                        <TextInput.Icon
                            name={hidden ? 'eye' : 'eye-off'}
                            onPress={() => setHidden(!hidden)}
                        />
                    }
                    value={password}
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    style={styles.marginBottom}
                />
                <View style={styles.alignCenter}>
                    <Button
                        mode="contained"
                        color={colors.royalBlue}
                        disabled={disableButton}
                        uppercase={false}
                        style={{
                            width: windowWidth / 2
                        }}
                        onPress={handleLogin}
                    >
                        Login
                    </Button>
                </View>
                <Portal>
                    <Dialog visible={!!error} onDismiss={() => setError('')}>
                        <Dialog.Title>Something is wrong.</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Please re-enter your email and password.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                color={colors.royalBlue}
                                uppercase={false}
                                onPress={() => setError('')}
                            >
                                Try Again
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    alignCenter: {
        alignItems: 'center'
    },
    textCenter: {
        textAlign: 'center'
    },
    marginBottom: {
        marginBottom: 10
    }
});
export default LoginScreen;
