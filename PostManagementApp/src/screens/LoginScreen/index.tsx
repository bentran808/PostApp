import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { object, string } from 'yup';
import { Screens } from 'constants/screens';
import { useAppDispatch } from 'hooks';
import { authActions } from '../../redux/slices';
import { styles } from './styles';
import { colors } from 'theme/Colors';

// Utilities
import { windowWidth } from 'utils/Dimensions';

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
interface LoginProps {
  navigation: LoginNavigationProp;
}

const loginSchema = object().shape({
  email: string().email(),
  password: string().min(5)
});

const validate = (key: string, value: string) => {
  try {
    loginSchema.validateSync({ [key]: value });
  } catch (err: any) {
    return err.errors[0];
  }
};

const LoginScreen = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const disableButton = !email || !password;
  const { error } = useMemo(() => {
    const isValid = loginSchema.isValidSync({ email, password });
    if (isValid) {
      return {
        error: {
          email: '',
          password: ''
        }
      };
    } else {
      return {
        error: {
          email: email ? validate('email', email) : '',
          password: password ? validate('password', password) : ''
        }
      };
    }
  }, [email, password]);

  const handleChangeEmail = (userEmail: string) => {
    setEmail(userEmail);
  };

  const handleChangePassword = (userPassword: string) => {
    setPassword(userPassword);
  };

  const handleHiddenPassword = () => setHidden(!hidden);

  const handleLogin = () => {
    dispatch(
      authActions.login({
        params: `email=${email}&password=${password}`,
        callback: (data, err) => {
          if (data) {
            navigation.navigate(Screens.HOME.name as 'Home');
            setEmail('');
            setPassword('');
            setHidden(true);
          }

          if (err) {
            Alert.alert(err.response.data.message);
          }
        }
      })
    );
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
          onChangeText={handleChangeEmail}
          keyboardType="email-address"
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          error={!!error.email}
          testID="emailInput"
        />
        <HelperText type="error" visible={!!error.email} testID="emailError">
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
              onPress={handleHiddenPassword}
              testID="icon"
            />
          }
          value={password}
          onChangeText={handleChangePassword}
          error={!!error.password}
          testID="passwordInput"
        />
        <HelperText type="error" visible={!!error.password} testID="passwordError">
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
            onPress={handleLogin}
            testID="loginButton"
          >
            Login
          </Button>
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
