import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { number, object, string } from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postActions, selectCurrentUser } from '../../redux/slices';
import AddPostScreen from '../../screens/AddPostScreen';

type AddPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface AddPostProps {
    navigation: AddPostNavigationProp;
    route: { params: { editedPost: Post } };
}

export interface PostState {
    photos: any;
    company: string;
    year: string;
    type: string;
    status: boolean;
    price: string;
    address?: string;
    title: string;
    description: string;
}

export interface ErrorInputState {
    company: string;
    year: string;
    type: string;
    price: string;
    title: string;
    description: string;
}

export const initialPost = {
    photos: [],
    company: '',
    year: '0',
    type: '',
    status: true,
    price: '0',
    address: '',
    title: '',
    description: ''
};

export const initialErrorInput = {
    company: '',
    year: '',
    type: '',
    price: '',
    title: '',
    description: ''
};

const postSchema = object().shape({
    company: string().required(),
    year: number().required().positive().integer(),
    type: string().required(),
    price: number().required().positive().integer(),
    title: string().required(),
    description: string().required()
});

const AddPostScreenContainer = ({ navigation, route }: AddPostProps) => {
    const [post, setPost] = useState<PostState>(initialPost);
    const [errorInput, setErrorInput] = useState<ErrorInputState>(initialErrorInput);
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => selectCurrentUser(state));
    const editedPost = route.params && route.params.editedPost;

    useEffect(() => {
        if (editedPost) {
            setPost({
                ...post,
                photos: editedPost.photos,
                company: editedPost.company,
                year: editedPost.year.toString(),
                type: editedPost.type,
                status: editedPost.status,
                price: editedPost.price.toString(),
                address: editedPost.address,
                title: editedPost.title,
                description: editedPost.description
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        const isValid = validationInput(key, value);

        if (isValid) {
            setErrorInput({ ...errorInput, [key]: '' });
        }
    };

    const validationInput = (key: string, value: string | number) => {
        const inputSchema = postSchema.pick([key]);
        const isValid = inputSchema.isValidSync({ [key]: value });
        inputSchema.validate({ [key]: value }).catch((err: { errors: string[] }) => {
            setErrorInput((prevState) => ({ ...prevState, [key]: err.errors[0] }));
        });

        return isValid;
    };

    const handleAddNewPost = () => {
        const isValid = postSchema.isValidSync(post);
        if (isValid) {
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
        } else {
            validationInput('company', post.company);
            validationInput('year', post.year);
            validationInput('type', post.type);
            validationInput('price', post.price);
            validationInput('title', post.title);
            validationInput('description', post.description);
        }
    };

    const handleEditPost = () => {
        const isValid = postSchema.isValidSync(post);
        if (isValid) {
            dispatch(
                postActions.editPost({
                    postId: editedPost.id || 0,
                    editedPost: {
                        author: currentUser,
                        company: post.company,
                        year: Number(post.year),
                        type: post.type,
                        status: post.status,
                        price: Number(post.price),
                        address: post.address || currentUser.address,
                        title: post.title,
                        description: post.description,
                        photos: post.photos
                    }
                })
            );
            navigation.goBack();
        } else {
            validationInput('company', post.company);
            validationInput('year', post.year);
            validationInput('type', post.type);
            validationInput('price', post.price);
            validationInput('title', post.title);
            validationInput('description', post.description);
        }
    };

    const handleSubmit = () => {
        if (editedPost) {
            handleEditPost();
        } else {
            handleAddNewPost();
        }
    };

    return (
        <AddPostScreen
            post={post}
            buttonText={editedPost ? 'Save' : 'Post'}
            errorInput={errorInput}
            onChoosePhoto={handleChoosePhoto}
            onSetPost={handleChangePost}
            onSetErrorInput={setErrorInput}
            onSubmit={handleSubmit}
        />
    );
};

export default AddPostScreenContainer;
