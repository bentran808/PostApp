import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authActions } from '../../redux/slices';
import LoginScreen from '../../screens/LoginScreen';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
interface LoginProps {
    navigation: LoginNavigationProp;
}

export interface ErrorState {
    email: string;
    password: string;
    errorMessage: string;
}

const loginSchema = object().shape({
    email: string().email(),
    password: string().min(5)
});

const LoginScreenContainer = ({ navigation }: LoginProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>({
        email: '',
        password: '',
        errorMessage: ''
    });
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const errorMessage = useAppSelector((state) => state.auth.errorMessage);
    const hasError = Object.values(error).some((item) => item !== '');

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('Home');
            setEmail('');
            setPassword('');
        }
    }, [isLoggedIn, navigation]);

    const handleChangeEmail = async (userEmail: string) => {
        const isValid = loginSchema.isValidSync({ email: userEmail });
        setEmail(userEmail);
        loginSchema
            .validate({ email: userEmail })
            .catch((err) => setError({ ...error, email: err.errors[0] }));
        if (isValid) {
            setError({ ...error, email: '' });
        }
    };

    const handleChangePassword = (userPassword: string) => {
        const isValid = loginSchema.isValidSync({ password: userPassword });
        setPassword(userPassword);
        loginSchema
            .validate({ password: userPassword })
            .catch((err) => setError({ ...error, password: err.errors[0] }));
        if (isValid) {
            setError({ ...error, password: '' });
        }
    };

    const handleHiddenPassword = () => setHidden(!hidden);

    const handleLogin = () => {
        dispatch(authActions.login(`email=${email}&password=${password}`));
        setError({ ...error, errorMessage });
    };

    return (
        <LoginScreen
            email={email}
            password={password}
            hidden={hidden}
            error={error}
            hasError={hasError}
            onSetError={setError}
            onChangeEmail={handleChangeEmail}
            onChangePassword={handleChangePassword}
            onHiddenPassword={handleHiddenPassword}
            onLogin={handleLogin}
        />
    );
};

export default LoginScreenContainer;
