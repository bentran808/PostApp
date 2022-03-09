import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimensions';

const ShowImageScreen = ({ route }: { route: { params: { url: ImageSourcePropType } } }) => {
    const imageUrl = route.params.url;
    return (
        <View style={styles.container}>
            <Image
                source={imageUrl}
                style={{
                    height: windowHeight / 3,
                    width: windowWidth
                }}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: 'black',
        height: windowHeight
    }
});

export default ShowImageScreen;
