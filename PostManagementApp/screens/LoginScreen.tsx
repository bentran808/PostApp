import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';

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
    const [error, setError] = useState('');
    const disableButton = !email || !password;

    const login = async () => {
        // await axios({
        //     method: 'post',
        //     url: 'https://192.168.56.1:3000/auth/login',
        //     data: `email=${email}&password=${password}`,
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         Accept: 'application/json'
        //     }
        // })
        //     .then(function (res) {
        //         console.log(res);
        //         navigation.navigate('Home');
        //     })
        //     .catch(function (err) {
        //         console.log(error);
        //         setError(err);
        //     });
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Ionicons name="logo-react" size={150} color="#0ff" />
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
                value={password}
                onChangeText={userPassword => setPassword(userPassword)}
                placeholderText="Password"
                secureTextEntry={true}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={!!error}
                onRequestClose={() => {
                    setError('');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            Something is wrong.
                        </Text>
                        <Text style={styles.modalText}>
                            Please re-enter your email and password.
                        </Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setError('')}>
                            <Text style={styles.textStyle}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FormButton
                title="Login"
                disabled={disableButton}
                color={disableButton ? '#ccc' : '#fff'}
                onPress={login}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: 300
    },
    button: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: '#fff',
        fontWeight: 'bold'
    },
    modalTitle: {
        fontWeight: 'bold'
    },
    modalText: {
        marginBottom: 15
    }
});
export default LoginScreen;
