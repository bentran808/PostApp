import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {windowHeight} from '../utils/Dimensions';

type FormInputProps = {
    iconType: string;
    value: string;
    placeholderText: string;
} & TextInputProps;

const FormInput = ({
    iconType,
    value,
    placeholderText,
    ...rest
}: FormInputProps) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color="#666" />
            </View>
            <TextInput
                value={value}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#666"
                style={styles.input}
                {...rest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        height: windowHeight / 15,
        marginBottom: 10,
        marginTop: 5,
        width: '100%'
    },
    iconStyle: {
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        height: '100%',
        justifyContent: 'center',
        padding: 10,
        width: 50
    },
    input: {
        alignItems: 'center',
        color: '#333',
        flex: 1,
        fontSize: 16,
        justifyContent: 'center',
        padding: 10
    }
});

export default FormInput;
