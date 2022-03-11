import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { axiosInstance } from '../../api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postActions, selectAccessToken, selectCurrentUser } from '../../redux/slices';
import AddPostScreen from '../../screens/AddPostScreen';

type AddPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AddPostProps {
    navigation: AddPostNavigationProp;
    route: { params: { editedId: Number } };
}

export interface PostState {
    photos: any;
    company: string;
    year: string;
    type: string;
    status: boolean;
    price: string;
    address: string;
    title: string;
    description: string;
}

export interface ErrorInputState {
    company: boolean;
    year: boolean;
    invalidYear: boolean;
    type: boolean;
    price: boolean;
    minOfPrice: boolean;
    maxOfPrice: boolean;
    title: boolean;
    description: boolean;
}

export const initialPost = {
    photos: [],
    company: '',
    year: '',
    type: '',
    status: true,
    price: '',
    address: '',
    title: '',
    description: ''
};

export const initialErrorInput = {
    company: false,
    year: false,
    invalidYear: false,
    type: false,
    price: false,
    minOfPrice: false,
    maxOfPrice: false,
    title: false,
    description: false
};

const AddPostScreenContainer = ({ navigation, route }: AddPostProps) => {
    const [post, setPost] = useState<PostState>(initialPost);
    const [errorInput, setErrorInput] = useState<ErrorInputState>(initialErrorInput);
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => selectAccessToken(state));
    const currentUser = useAppSelector((state) => selectCurrentUser(state));
    const postId = route.params && route.params.editedId;

    useEffect(() => {
        if (postId) {
            const source = axios.CancelToken.source();
            const getEditedPost = async () => {
                try {
                    const response = await axiosInstance.get(`api/posts/${postId}`, {
                        cancelToken: source.token,
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                    setPost({
                        ...post,
                        photos: response.data.photos,
                        company: response.data.company,
                        year: response.data.year,
                        type: response.data.type,
                        status: response.data.status,
                        price: response.data.price,
                        address: response.data.address,
                        title: response.data.title,
                        description: response.data.description
                    });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, postId]);

    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                selectionLimit: 0
            },
            (response) => {
                if (response && response.assets) {
                    setPost({
                        ...post,
                        photos: post.photos.concat(response.assets)
                    });
                }
            }
        );
    };

    const handleChangePost = (key: string, value: any) => {
        setPost({ ...post, [key]: value });
    };

    const handleAddNewPost = async () => {
        dispatch(
            postActions.addPost({
                author: currentUser,
                company: post.company,
                year: Number(post.year),
                type: post.type,
                status: post.status,
                price: Number(post.price),
                address: post.address || currentUser.address,
                title: post.title,
                description: post.description,
                photos: post.photos,
                pending: true
            })
        );
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }]
        });
        navigation.navigate('MyPost');
    };

    const handleEditPost = async () => {
        try {
            const response = await axiosInstance.patch(
                `api/posts/${postId}`,
                {
                    company: post.company,
                    year: post.year,
                    type: post.type,
                    status: post.status,
                    price: post.price,
                    address: post.address || currentUser?.address,
                    title: post.title,
                    description: post.description,
                    photos: post.photos
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
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
        <AddPostScreen
            post={post}
            postId={postId}
            errorInput={errorInput}
            onChoosePhoto={handleChoosePhoto}
            onSetPost={handleChangePost}
            onSetErrorInput={setErrorInput}
            onAddNewPost={handleAddNewPost}
            onEditPost={handleEditPost}
        />
    );
};

export default AddPostScreenContainer;
