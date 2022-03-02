import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MyPostScreen = () => (
    <View style={styles.body}>
        <Text style={styles.text}>My Post Tab</Text>
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

export default MyPostScreen;
