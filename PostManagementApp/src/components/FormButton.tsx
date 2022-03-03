import React from 'react';
import {ButtonProps, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {windowHeight} from '../utils/Dimensions';

type FormButtonProps = {
    title?: string;
    color?: string;
} & ButtonProps;

const FormButton = ({
    title = 'Button',
    color = '#fff',
    ...rest
}: FormButtonProps) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={[styles.buttonText, {color}]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#2e64e5',
        borderRadius: 3,
        height: windowHeight / 15,
        justifyContent: 'center',
        marginTop: 10,
        padding: 10,
        width: '100%'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default FormButton;
