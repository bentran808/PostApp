import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, HelperText, Paragraph, Portal, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { ErrorState } from '../../container/LoginScreen';
import { styles } from '../../styles/LoginScreenStyles';

// Utilities
import { windowWidth } from '../../utils/Dimensions';

type LoginScreenProps = {
    email: string;
    password: string;
    hidden: boolean;
    error: ErrorState;
    hasError: boolean;
    onSetError: (error: ErrorState) => void;
    onChangeEmail: (value: string) => void;
    onChangePassword: (value: string) => void;
    onHiddenPassword: () => void;
    onLogin: () => void;
};

const LoginScreen = ({
    email,
    password,
    hidden,
    error,
    hasError,
    onSetError,
    onChangeEmail,
    onChangePassword,
    onHiddenPassword,
    onLogin
}: LoginScreenProps) => {
    const disableButton = !email || !password || hasError;

    return (
        <>
            <View style={styles.container}>
                <Ionicons name="logo-react" size={150} color="#0ff" style={styles.textCenter} />
                <TextInput
                    mode="outlined"
                    activeOutlineColor={colors.royalBlue}
                    label="Email"
                    value={email}
                    onChangeText={(userEmail) => onChangeEmail(userEmail)}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    error={!!error.email}
                />
                <HelperText type="error" visible={!!error.email}>
                    {error.email}
                </HelperText>
                <TextInput
                    mode="outlined"
                    activeOutlineColor={colors.royalBlue}
                    label="Password"
                    secureTextEntry={hidden}
                    right={
                        <TextInput.Icon
                            name={hidden ? 'eye' : 'eye-off'}
                            onPress={onHiddenPassword}
                        />
                    }
                    value={password}
                    onChangeText={(userPassword) => onChangePassword(userPassword)}
                    error={!!error.password}
                />
                <HelperText type="error" visible={!!error.password}>
                    {error.password}
                </HelperText>
                <View style={styles.alignCenter}>
                    <Button
                        mode="contained"
                        color={colors.royalBlue}
                        disabled={disableButton}
                        uppercase={false}
                        style={{
                            width: windowWidth / 2
                        }}
                        onPress={onLogin}
                    >
                        Login
                    </Button>
                </View>
                <Portal>
                    <Dialog visible={!!error.errorMessage}>
                        <Dialog.Title>Something is wrong.</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Please re-enter your email and password.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                color={colors.royalBlue}
                                uppercase={false}
                                onPress={() => onSetError({ ...error, errorMessage: '' })}
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

export default LoginScreen;
