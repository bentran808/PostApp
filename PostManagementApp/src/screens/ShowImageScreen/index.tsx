import React from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from 'react-native-hook-image-slider';
import { Colors } from 'react-native-paper';

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
    backgroundColor: Colors.black,
    height: '100%'
  }
});

export default ShowImageScreen;
