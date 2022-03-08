import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Dialog, Paragraph, Portal, TextInput} from 'react-native-paper';

// Utilities
import {axiosInstance} from '../utils/AxiosConfig';
import {AppContext} from '../navigation/AppContext';
import {windowWidth} from '../utils/Dimensions';
import {colors} from '../constants/colors';

type LoginNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;
interface LoginProps {
    navigation: LoginNavigationProp;
}

const LoginScreen = ({navigation}: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState<unknown>();
    const {setUser} = useContext(AppContext);
    const disableButton = !email || !password;

    const login = async () => {
        try {
            const response = await axiosInstance.post(
                'auth/login',
                `email=${email}&password=${password}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Accept: 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                setEmail('');
                setPassword('');
                console.log(response);
                setUser(response.data);
                navigation.navigate('Home');
            } else {
                throw new Error('An error has occurred');
            }
        } catch (err) {
            setError(err);
            console.log(err);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <Ionicons
                    name="logo-react"
                    size={150}
                    color="#0ff"
                    style={styles.textCenter}
                />
                <TextInput
                    mode="outlined"
                    activeOutlineColor={colors.royalBlue}
                    label="Email"
                    value={email}
                    onChangeText={userEmail => setEmail(userEmail)}
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
                    onChangeText={userPassword => setPassword(userPassword)}
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
                        onPress={login}>
                        Login
                    </Button>
                </View>
                <Portal>
                    <Dialog visible={!!error} onDismiss={() => setError('')}>
                        <Dialog.Title>Something is wrong.</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                Please re-enter your email and password.
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                color={colors.royalBlue}
                                uppercase={false}
                                onPress={() => setError('')}>
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
