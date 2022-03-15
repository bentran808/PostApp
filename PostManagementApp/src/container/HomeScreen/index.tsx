import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
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

    const handleLikePost = async (postId: number) => {
        dispatch(postActions.likePost({ postId, currentUser }));
    };

    const handleUnlikePost = async (likeId: number) => {
        dispatch(postActions.unlikePost(likeId));
    };

    const handleAddNewComment = async (postId: number) => {
        dispatch(postActions.addComment({ postId, currentUser, content }));
        setContent('');
    };

    const handleDeleteComment = async (commentId: number) => {
        dispatch(postActions.deleteComment(commentId));
    };

    const handleEditComment = async (commentId: number) => {
        dispatch(postActions.editComment({ commentId, newContent: editContent }));
        setEditContent('');
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
