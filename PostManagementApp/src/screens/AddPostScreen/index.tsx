/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Chip, Colors, HelperText, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../constants/colors';
import { errorMessages } from '../../constants/messages';
import {
    ErrorInputState,
    initialErrorInput,
    initialPost,
    PostState
} from '../../container/AddPostScreen';
import { styles } from '../../styles/AddPostScreenStyles';

type AddPostScreenProps = {
    post: PostState;
    postId: Number;
    errorInput: ErrorInputState;
    onChoosePhoto: () => void;
    onSetPost: (key: string, value: any) => void;
    onSetErrorInput: (errorInput: ErrorInputState) => void;
    onAddNewPost: () => void;
    onEditPost: () => void;
};

const AddPostScreen = ({
    post = initialPost,
    postId,
    errorInput = initialErrorInput,
    onChoosePhoto,
    onSetPost,
    onSetErrorInput,
    onAddNewPost,
    onEditPost
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
                    error={errorInput.company}
                />
                <HelperText type="error" visible={errorInput.company}>
                    {errorMessages.requiredInput}
                </HelperText>
                <TextInput
                    value={post.year}
                    onChangeText={(itemValue) => onSetPost('year', itemValue)}
                    label="Year of registration"
                    keyboardType="number-pad"
                    mode="outlined"
                    error={errorInput.year || errorInput.invalidYear}
                    onBlur={() => {
                        const hasError = Number(post.year) > new Date().getFullYear();
                        onSetErrorInput({
                            ...errorInput,
                            year: !post.year,
                            invalidYear: hasError
                        });
                    }}
                />
                <HelperText type="error" visible={errorInput.year || errorInput.invalidYear}>
                    {errorInput.year && errorMessages.requiredInput}
                    {errorInput.invalidYear && 'You must enter year less than current year!'}
                </HelperText>
                <TextInput
                    value={post.type}
                    onChangeText={(itemValue) => onSetPost('type', itemValue)}
                    label="Type of product"
                    mode="outlined"
                    error={errorInput.type}
                    onBlur={() => onSetErrorInput({ ...errorInput, type: !post.type })}
                />
                <HelperText type="error" visible={errorInput.type}>
                    {errorMessages.requiredInput}
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
                    error={errorInput.price || errorInput.minOfPrice || errorInput.maxOfPrice}
                    onBlur={() =>
                        onSetErrorInput({
                            ...errorInput,
                            price: !post.price,
                            minOfPrice: Number(post.price) < 1000,
                            maxOfPrice: Number(post.price) > 100000000
                        })
                    }
                />
                <HelperText
                    type="error"
                    visible={errorInput.price || errorInput.minOfPrice || errorInput.maxOfPrice}
                >
                    {errorInput.price && errorMessages.requiredInput}
                    {!errorInput.price &&
                        errorInput.minOfPrice &&
                        'You must enter the minimum price 1.000 VND!'}
                    {errorInput.maxOfPrice &&
                        'You can only enter the maximum price 100.000.000 VND!'}
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
                    error={errorInput.title}
                    onBlur={() => onSetErrorInput({ ...errorInput, title: !post.title })}
                />
                <HelperText type="error" visible={errorInput.title}>
                    {errorMessages.requiredInput}
                </HelperText>
                <TextInput
                    value={post.description}
                    onChangeText={(itemValue) => onSetPost('description', itemValue)}
                    label="Description"
                    multiline
                    numberOfLines={4}
                    mode="outlined"
                    error={errorInput.description}
                    onBlur={() =>
                        onSetErrorInput({
                            ...errorInput,
                            description: !post.description
                        })
                    }
                />
                <HelperText type="error" visible={errorInput.description}>
                    {errorMessages.requiredInput}
                </HelperText>
            </View>
            <View style={{ marginBottom: 40 }}>
                <Button
                    mode="contained"
                    color={colors.royalBlue}
                    disabled={Object.values(errorInput).includes(true)}
                    onPress={() => {
                        postId ? onEditPost() : onAddNewPost();
                    }}
                >
                    {postId ? 'Save' : 'Post'}
                </Button>
            </View>
        </ScrollView>
    );
};

export default AddPostScreen;
