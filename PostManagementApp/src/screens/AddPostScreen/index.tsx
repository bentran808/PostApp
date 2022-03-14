/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Chip, Colors, HelperText, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import {
    ErrorInputState,
    initialErrorInput,
    initialPost,
    PostState
} from '../../container/AddPostScreen';
import { styles } from '../../styles/AddPostScreenStyles';

type AddPostScreenProps = {
    post: PostState;
    buttonText: string;
    errorInput: ErrorInputState;
    onChoosePhoto: () => void;
    onSetPost: (key: string, value: any) => void;
    onSetErrorInput: (errorInput: ErrorInputState) => void;
    onSubmit: () => void;
};

const AddPostScreen = ({
    post = initialPost,
    buttonText,
    errorInput = initialErrorInput,
    onChoosePhoto,
    onSetPost,
    onSubmit
}: AddPostScreenProps) => {
    return (
        <ScrollView style={styles.body}>
            <View style={styles.photoSection}>
                <View style={styles.photoWrapper}>
                    <TouchableOpacity onPress={onChoosePhoto} style={styles.photoButton}>
                        <Ionicons name="camera" size={30} color={colors.nightRider} />
                        <Text>Choose Photo</Text>
                    </TouchableOpacity>
                </View>
                {(post.photos || []).length ? (
                    <FlatList
                        data={post.photos}
                        horizontal
                        extraData={post.photos}
                        renderItem={({ item, index }) => (
                            <>
                                <Image source={{ uri: item.uri }} style={styles.previewPhoto} />
                                <Ionicons
                                    name="close"
                                    size={20}
                                    color={colors.freeSpeechRed}
                                    style={styles.closeButton}
                                    onPress={() => {
                                        post.photos.splice(index, 1);
                                        onSetPost('photos', post.photos);
                                    }}
                                />
                            </>
                        )}
                    />
                ) : undefined}
            </View>
            <Text style={styles.titleSection}>Details</Text>
            <View style={styles.section}>
                <TextInput
                    value={post.company}
                    onChangeText={(itemValue) => onSetPost('company', itemValue)}
                    label="Product Company"
                    mode="outlined"
                    error={!!errorInput.company}
                />
                <HelperText type="error" visible={!!errorInput.company}>
                    {errorInput.company}
                </HelperText>
                <TextInput
                    value={post.year}
                    onChangeText={(itemValue) => onSetPost('year', itemValue)}
                    label="Year of registration"
                    keyboardType="number-pad"
                    mode="outlined"
                    error={!!errorInput.year}
                />
                <HelperText type="error" visible={!!errorInput.year}>
                    {errorInput.year}
                </HelperText>
                <TextInput
                    value={post.type}
                    onChangeText={(itemValue) => onSetPost('type', itemValue)}
                    label="Type of product"
                    mode="outlined"
                    error={!!errorInput.type}
                />
                <HelperText type="error" visible={!!errorInput.type}>
                    {errorInput.type}
                </HelperText>
                <Text>Status</Text>
                <View style={styles.statusWrapper}>
                    <Chip
                        selected={post.status}
                        selectedColor={post.status ? colors.selectiveYellow : Colors.black}
                        textStyle={{
                            color: post.status ? colors.selectiveYellow : Colors.black
                        }}
                        style={{
                            backgroundColor: post.status ? colors.oasis : colors.lightGrey,
                            marginRight: 10
                        }}
                        onPress={() => onSetPost('status', true)}
                    >
                        Used
                    </Chip>
                    <Chip
                        selected={!post.status}
                        selectedColor={!post.status ? colors.selectiveYellow : Colors.black}
                        textStyle={{
                            color: !post.status ? colors.selectiveYellow : Colors.black
                        }}
                        style={{
                            backgroundColor: !post.status ? colors.oasis : colors.lightGrey
                        }}
                        onPress={() => onSetPost('status', false)}
                    >
                        New
                    </Chip>
                </View>
                <TextInput
                    value={post.price}
                    onChangeText={(itemValue) => onSetPost('price', itemValue)}
                    label="Price"
                    keyboardType="number-pad"
                    mode="outlined"
                    error={!!errorInput.price}
                />
                <HelperText type="error" visible={!!errorInput.price}>
                    {errorInput.price}
                </HelperText>
                <TextInput
                    value={post.address}
                    onChangeText={(itemValue) => onSetPost('address', itemValue)}
                    label="Address"
                    mode="outlined"
                />
            </View>
            <Text style={styles.titleSection}>Title and Description</Text>
            <View style={styles.section}>
                <TextInput
                    value={post.title}
                    onChangeText={(itemValue) => onSetPost('title', itemValue)}
                    label="Title"
                    mode="outlined"
                    error={!!errorInput.title}
                />
                <HelperText type="error" visible={!!errorInput.title}>
                    {errorInput.title}
                </HelperText>
                <TextInput
                    value={post.description}
                    onChangeText={(itemValue) => onSetPost('description', itemValue)}
                    label="Description"
                    multiline
                    numberOfLines={4}
                    mode="outlined"
                    error={!!errorInput.description}
                />
                <HelperText type="error" visible={!!errorInput.description}>
                    {errorInput.description}
                </HelperText>
            </View>
            <View style={{ marginBottom: 40 }}>
                <Button
                    mode="contained"
                    color={colors.royalBlue}
                    disabled={Object.values(errorInput).includes(true)}
                    onPress={onSubmit}
                >
                    {buttonText}
                </Button>
            </View>
        </ScrollView>
    );
};

export default AddPostScreen;
