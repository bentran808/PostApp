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
}

const loginSchema = object().shape({
    email: string().email(),
    password: string().min(6)
});

const LoginScreenContainer = ({ navigation }: LoginProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState>({
        email: '',
        password: ''
    });
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('Home');
            setEmail('');
            setPassword('');
        }
    }, [isLoggedIn, navigation]);

    const handleChangeEmail = async (userEmail: string) => setEmail(userEmail);

    const handleChangePassword = (userPassword: string) => setPassword(userPassword);

    const handleHiddenPassword = () => setHidden(!hidden);

    const handleLogin = () => {
        dispatch(authActions.login(`email=${email}&password=${password}`));
    };

    return (
        <LoginScreen
            email={email}
            password={password}
            hidden={hidden}
            error={error}
            onChangeEmail={handleChangeEmail}
            onChangePassword={handleChangePassword}
            onHiddenPassword={handleHiddenPassword}
            onLogin={handleLogin}
        />
    );
};

export default LoginScreenContainer;
