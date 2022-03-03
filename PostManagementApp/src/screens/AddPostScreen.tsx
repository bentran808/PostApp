import React, {useContext, useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import FormButton from '../components/FormButton';
import {launchImageLibrary} from 'react-native-image-picker';
import FormInput from '../components/FormInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {axiosInstance} from '../utils/AxiosConfig';
import {CounterContext} from '../navigation/CounterContext';
import axios from 'axios';

type AddPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AddPostProps {
    navigation: AddPostNavigationProp;
    route: {params: {editedId: Number}};
}

const AddPostScreen = ({navigation, route}: AddPostProps) => {
    const {user} = useContext(CounterContext);
    const [photo, setPhoto] = useState<any>();
    const [company, setCompany] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState(true);
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const postId = route.params && route.params.editedId;

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
                        throw new Error('Failed to fetch users');
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
                // noData: true,
                mediaType: 'photo',
                selectionLimit: 0
            },
            response => {
                if (response) {
                    setPhoto(response.assets);
                }
            }
        );
    };

    const addNewPost = async () => {
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
                    photos: [],
                    likes: [],
                    comments: []
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                navigation.navigate('HomeScreen');
                return;
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editPost = async () => {
        try {
            const response = await axiosInstance.patch(
                `api/posts/${postId}`,
                {
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
                        Authorization: `Bearer ${user.access_token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                navigation.navigate('HomeScreen');
                return;
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView style={styles.body}>
            {photo?.length && (
                <>
                    <FlatList
                        data={photo}
                        horizontal
                        renderItem={({item}) => (
                            <Image
                                source={{uri: item.uri}}
                                style={{width: 100, height: 100}}
                            />
                        )}
                    />
                </>
            )}
            <Text style={styles.titleSection}>Details</Text>
            <View style={styles.section}>
                <FormInput
                    value={company}
                    onChangeText={itemValue => setCompany(itemValue)}
                    placeholderText="Product Company"
                />
                <FormInput
                    value={year}
                    onChangeText={itemValue => setYear(itemValue)}
                    placeholderText="Year of registration"
                />
                <FormInput
                    value={type}
                    onChangeText={itemValue => setType(itemValue)}
                    placeholderText="Type of product"
                />
                <Text>Status</Text>
                <View style={styles.statusWrapper}>
                    <Text
                        onPress={() => setStatus(true)}
                        style={
                            status ? styles.statusActive : styles.statusInactive
                        }>
                        Used
                    </Text>
                    <Text
                        onPress={() => setStatus(false)}
                        style={
                            status ? styles.statusInactive : styles.statusActive
                        }>
                        New
                    </Text>
                </View>
                <FormInput
                    value={price}
                    onChangeText={itemValue => setPrice(itemValue)}
                    placeholderText="Price"
                    keyboardType="number-pad"
                />
                <FormInput
                    value={address}
                    onChangeText={itemValue => setAddress(itemValue)}
                    placeholderText="Address"
                />
            </View>
            <Text style={styles.titleSection}>Title and Description</Text>
            <View style={styles.section}>
                <FormInput
                    value={title}
                    onChangeText={itemValue => setTitle(itemValue)}
                    placeholderText="Title"
                />
                <FormInput
                    value={description}
                    onChangeText={itemValue => setDescription(itemValue)}
                    placeholderText="Description"
                    multiline
                    numberOfLines={4}
                />
            </View>
            <View style={{marginBottom: 20}}>
                <FormButton title="Choose Photo" onPress={handleChoosePhoto} />
                <FormButton
                    title={postId ? 'Save' : 'Post'}
                    onPress={postId ? editPost : addNewPost}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingVertical: 20
    },
    titleSection: {
        color: '#333',
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    section: {
        backgroundColor: '#fff',
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%'
    },
    statusWrapper: {
        flexDirection: 'row',
        marginVertical: 10
    },
    statusInactive: {
        backgroundColor: '#ccc',
        color: '#000',
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
