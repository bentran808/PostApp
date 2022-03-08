/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Chip, Colors, HelperText, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {axiosInstance} from '../utils/AxiosConfig';
import {AppContext} from '../navigation/AppContext';
import {colors} from '../constants/colors';
import {errorMessages} from '../constants/messages';

type AddPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AddPostProps {
    navigation: AddPostNavigationProp;
    route: {params: {editedId: Number}};
}

const AddPostScreen = ({navigation, route}: AddPostProps) => {
    const {user} = useContext(AppContext);
    const [photos, setPhoto] = useState<any>([]);
    const [company, setCompany] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState(true);
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const postId = route.params && route.params.editedId;
    const [errorInput, setErrorInput] = useState({
        company: false,
        year: false,
        invalidYear: false,
        type: false,
        price: false,
        minOfPrice: false,
        maxOfPrice: false,
        title: false,
        description: false
    });

    useEffect(() => {
        if (postId) {
            const source = axios.CancelToken.source();
            const getEditedPost = async () => {
                try {
                    const response = await axiosInstance.get(
                        `api/posts/${postId}`,
                        {
                            cancelToken: source.token,
                            headers: {
                                Authorization: `Bearer ${user.access_token}`
                            }
                        }
                    );
                    if (response.status === 200) {
                        setPhoto(response.data.photos);
                        setCompany(response.data.company);
                        setYear(response.data.year);
                        setType(response.data.type);
                        setStatus(response.data.status);
                        setPrice(response.data.price);
                        setAddress(response.data.address);
                        setTitle(response.data.title);
                        setDescription(response.data.description);
                        return;
                    } else {
                        throw new Error('Failed to fetch edit post data');
                    }
                } catch (error) {
                    if (axios.isCancel(error)) {
                        console.log('Data fetching cancelled');
                    } else {
                        console.log(error);
                    }
                }
            };
            getEditedPost();
            return () => source.cancel('Data fetching cancelled');
        }
    }, [postId, user.access_token]);

    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 0
            },
            response => {
                if (response && response.assets) {
                    setPhoto(photos.concat(response.assets));
                }
            }
        );
    };

    const validateInput = () => {
        setErrorInput({
            ...errorInput,
            company: !company,
            year: !year,
            type: !type,
            price: !price,
            title: !title,
            description: !description
        });
        return;
    };

    const addNewPost = async () => {
        validateInput();
        try {
            const response = await axiosInstance.post(
                'api/posts',
                {
                    author: user.data,
                    company,
                    year,
                    type,
                    status,
                    price,
                    address: address || user.data.address,
                    title,
                    description,
                    photos,
                    pending: true
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                }
            );
            if ([200, 201].includes(response.status)) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}]
                });
                navigation.navigate('MyPost', {
                    data: response.data
                });
                return;
            } else {
                throw new Error('Failed to add a new post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editPost = async () => {
        validateInput();
        try {
            const response = await axiosInstance.patch(
                `api/posts/${postId}`,
                {
                    photos,
                    company,
                    year,
                    type,
                    status,
                    price,
                    address: address || user.data.address,
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                }
            );
            if (response.status === 200) {
                navigation.navigate('HomeScreen', {
                    data: response.data
                });
                return;
            } else {
                throw new Error('Failed to update a post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView style={styles.body}>
            <View style={styles.photoSection}>
                <View style={styles.photoWrapper}>
                    <TouchableOpacity
                        onPress={handleChoosePhoto}
                        style={styles.photoButton}>
                        <Ionicons
                            name="camera"
                            size={30}
                            color={colors.nightRider}
                        />
                        <Text>Choose Photo</Text>
                    </TouchableOpacity>
                </View>
                {photos.length ? (
                    <FlatList
                        data={photos}
                        horizontal
                        extraData={photos}
                        renderItem={({item, index}) => (
                            <>
                                <Image
                                    source={{uri: item.uri}}
                                    style={styles.previewPhoto}
                                />
                                <Ionicons
                                    name="close"
                                    size={20}
                                    color={colors.freeSpeechRed}
                                    style={styles.closeButton}
                                    onPress={() => {
                                        photos.splice(index, 1);
                                        setPhoto((prevState: any) => [
                                            ...prevState
                                        ]);
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
                    value={company}
                    onChangeText={itemValue => setCompany(itemValue)}
                    label="Product Company"
                    mode="outlined"
                    error={errorInput.company}
                    onBlur={() =>
                        setErrorInput({...errorInput, company: !company})
                    }
                />
                <HelperText type="error" visible={errorInput.company}>
                    {errorMessages.requiredInput}
                </HelperText>
                <TextInput
                    value={year}
                    onChangeText={itemValue => setYear(itemValue)}
                    label="Year of registration"
                    keyboardType="number-pad"
                    mode="outlined"
                    error={errorInput.year || errorInput.invalidYear}
                    onBlur={() => {
                        const hasError =
                            Number(year) > new Date().getFullYear();
                        setErrorInput({
                            ...errorInput,
                            year: !year,
                            invalidYear: hasError
                        });
                    }}
                />
                <HelperText
                    type="error"
                    visible={errorInput.year || errorInput.invalidYear}>
                    {errorInput.year && errorMessages.requiredInput}
                    {errorInput.invalidYear &&
                        'You must enter year less than current year!'}
                </HelperText>
                <TextInput
                    value={type}
                    onChangeText={itemValue => setType(itemValue)}
                    label="Type of product"
                    mode="outlined"
                    error={errorInput.type}
                    onBlur={() => setErrorInput({...errorInput, type: !type})}
                />
                <HelperText type="error" visible={errorInput.type}>
                    {errorMessages.requiredInput}
                </HelperText>
                <Text>Status</Text>
                <View style={styles.statusWrapper}>
                    <Chip
                        selected={status}
                        selectedColor={
                            status ? colors.selectiveYellow : Colors.black
                        }
                        textStyle={{
                            color: status
                                ? colors.selectiveYellow
                                : Colors.black
                        }}
                        style={{
                            backgroundColor: status
                                ? colors.oasis
                                : colors.lightGrey,
                            marginRight: 10
                        }}
                        onPress={() => setStatus(true)}>
                        Used
                    </Chip>
                    <Chip
                        selected={!status}
                        selectedColor={
                            !status ? colors.selectiveYellow : Colors.black
                        }
                        textStyle={{
                            color: !status
                                ? colors.selectiveYellow
                                : Colors.black
                        }}
                        style={{
                            backgroundColor: !status
                                ? colors.oasis
                                : colors.lightGrey
                        }}
                        onPress={() => setStatus(false)}>
                        New
                    </Chip>
                </View>
                <TextInput
                    value={price}
                    onChangeText={itemValue => setPrice(itemValue)}
                    label="Price"
                    keyboardType="number-pad"
                    mode="outlined"
                    error={
                        errorInput.price ||
                        errorInput.minOfPrice ||
                        errorInput.maxOfPrice
                    }
                    onBlur={() =>
                        setErrorInput({
                            ...errorInput,
                            price: !price,
                            minOfPrice: Number(price) < 1000,
                            maxOfPrice: Number(price) > 100000000
                        })
                    }
                />
                <HelperText
                    type="error"
                    visible={
                        errorInput.price ||
                        errorInput.minOfPrice ||
                        errorInput.maxOfPrice
                    }>
                    {errorInput.price && errorMessages.requiredInput}
                    {!errorInput.price &&
                        errorInput.minOfPrice &&
                        'You must enter the minimum price 1.000 VND!'}
                    {errorInput.maxOfPrice &&
                        'You can only enter the maximum price 100.000.000 VND!'}
                </HelperText>
                <TextInput
                    value={address}
                    onChangeText={itemValue => setAddress(itemValue)}
                    label="Address"
                    mode="outlined"
                />
            </View>
            <Text style={styles.titleSection}>Title and Description</Text>
            <View style={styles.section}>
                <TextInput
                    value={title}
                    onChangeText={itemValue => setTitle(itemValue)}
                    label="Title"
                    mode="outlined"
                    error={errorInput.title}
                    onBlur={() => setErrorInput({...errorInput, title: !title})}
                />
                <HelperText type="error" visible={errorInput.title}>
                    {errorMessages.requiredInput}
                </HelperText>
                <TextInput
                    value={description}
                    onChangeText={itemValue => setDescription(itemValue)}
                    label="Description"
                    multiline
                    numberOfLines={4}
                    mode="outlined"
                    error={errorInput.description}
                    onBlur={() =>
                        setErrorInput({
                            ...errorInput,
                            description: !description
                        })
                    }
                />
                <HelperText type="error" visible={errorInput.description}>
                    {errorMessages.requiredInput}
                </HelperText>
            </View>
            <View style={{marginBottom: 40}}>
                <Button
                    mode="contained"
                    color={colors.royalBlue}
                    disabled={Object.values(errorInput).includes(true)}
                    onPress={() => {
                        postId ? editPost() : addNewPost();
                    }}>
                    {postId ? 'Save' : 'Post'}
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingVertical: 20
    },
    photoSection: {
        flexDirection: 'row'
    },
    photoWrapper: {
        padding: 10,
        borderColor: colors.nightRider,
        backgroundColor: colors.gainsboro,
        marginLeft: 10,
        flex: 0
    },
    photoButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    previewPhoto: {
        width: 75,
        height: 75,
        marginLeft: 10
    },
    closeButton: {
        position: 'relative',
        left: -15,
        top: -5
    },
    titleSection: {
        color: colors.nightRider,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    section: {
        backgroundColor: Colors.white,
        marginBottom: 20,
        padding: 10,
        width: '100%'
    },
    statusWrapper: {
        flexDirection: 'row',
        marginVertical: 10
    },
    statusInactive: {
        backgroundColor: '#ccc',
        color: Colors.black,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10
    },
    statusActive: {
        backgroundColor: '#faedc8',
        color: '#fcba03',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginRight: 10
    }
});

export default AddPostScreen;
