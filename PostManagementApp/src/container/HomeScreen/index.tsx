import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { axiosInstance } from '../../api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    authActions,
    postActions,
    selectComments,
    selectCurrentUser,
    selectLikes,
    selectPosts
} from '../../redux/slices';
import HomeScreen from '../../screens/HomeScreen';
import { getApprovedPosts } from '../../utils/helpers';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenContainerProps {
    navigation: HomeNavigationProp;
    route: {
        params: {
            data: Post;
        };
    };
}

const HomeScreenContainer = ({ navigation }: HomeScreenContainerProps) => {
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const currentUser = useAppSelector((state) => selectCurrentUser(state));
    const posts = useAppSelector((state) => selectPosts(state));
    const likes = useAppSelector((state) => selectLikes(state));
    const comments = useAppSelector((state) => selectComments(state));

    useEffect(() => {
        dispatch(postActions.fetchData());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(authActions.logout());
            navigation.navigate('Login');
        }
    }, [dispatch, isLoggedIn, navigation]);

    const handleShowImage = (photos: Photo[]) => {
        navigation.navigate('ShowImage', {
            photos
        });
    };

    const handleEdit = (post: Post) => {
        navigation.navigate('AddPost', {
            editedPost: post
        });
    };

    const handleDelete = async (postId: number) => {
        dispatch(postActions.deletePost(postId));
    };

    const handleLikePost = async (postId: Number) => {
        try {
            const response = await axiosInstance.post(`api/posts/${postId}/likes`, {
                author: currentUser,
                postId
            });
            if (response.status === 201) {
                // setLikes(likes.concat(response.data));
            } else {
                throw new Error('Failed to like post');
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Failed to like post',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    };

    const handleUnlikePost = async (likeId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/likes/${likeId}`);
            if (response.status === 200) {
                // setLikes(likes.filter((like) => like.id !== likeId));
            } else {
                throw new Error('Failed to unlike post');
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Failed to unlike post',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    };

    const handleAddNewComment = async (postId: Number) => {
        try {
            const response = await axiosInstance.post(`api/posts/${postId}/comments`, {
                author: currentUser,
                postId,
                content
            });
            if (response.status === 201) {
                setContent('');
                // setComments(comments.concat(response.data));
            } else {
                throw new Error('Failed to comment on post');
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Failed to comment on post',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    };

    const handleDeleteComment = async (commentId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/comments/${commentId}`);
            if (response.status === 200) {
                // setComments(comments.filter((comment) => comment.id !== commentId));
            } else {
                throw new Error('Failed to delete comment of post');
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Failed to delete comment of post',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    };

    const handleEditComment = async (commentId: Number) => {
        try {
            const response = await axiosInstance.patch(`api/comments/${commentId}`, {
                content: editContent
            });

            if (response.status === 200) {
                setEditContent('');
                // setComments(
                //     comments.map((comment) =>
                //         response.data.id === comment.id ? response.data : comment
                //     )
                // );
                return true;
            } else {
                throw new Error('Failed to update comment of post');
            }
        } catch (error) {
            ToastAndroid.showWithGravity(
                'Failed to update comment of post',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
            return false;
        }
    };

    return (
        <HomeScreen
            posts={getApprovedPosts(posts)}
            likes={likes}
            comments={comments}
            content={content}
            editContent={editContent}
            onShowImage={handleShowImage}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onLikePost={handleLikePost}
            onUnlikePost={handleUnlikePost}
            onSetContent={setContent}
            onAddNewComment={handleAddNewComment}
            onDeleteComment={handleDeleteComment}
            onSetEditContent={setEditContent}
            onEditComment={handleEditComment}
        />
    );
};

export default HomeScreenContainer;
