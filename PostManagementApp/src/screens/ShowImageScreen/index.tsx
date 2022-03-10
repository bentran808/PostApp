import React from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from 'react-native-hook-image-slider';
import { windowHeight } from '../../utils/Dimensions';

const ShowImageScreen = ({ route }: { route: { params: { photos: Photo[] } } }) => {
    const photos = route.params.photos;

    return (
        <View style={styles.container}>
            <Slider images={photos.map((photo: { uri: string }) => photo.uri)} />
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
