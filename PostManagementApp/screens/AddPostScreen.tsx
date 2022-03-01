import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AddPostScreen = () => (
    <View style={styles.body}>
        <Text style={styles.text}>Add Post Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default AddPostScreen;
