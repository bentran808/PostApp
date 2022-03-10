import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '../../api';
import { useAppSelector } from '../../hooks';
import HomeScreen from '../../screens/HomeScreen';
import { getAllPostsRequest, getApprovedPosts, sortDesc } from '../../utils/helpers';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenContainerProps {
    navigation: HomeNavigationProp;
    route: {
        params: {
            data: Post;
        };
    };
}

const HomeScreenContainer = ({ navigation, route }: HomeScreenContainerProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [likes, setLikes] = useState<PostLike[]>([]);
    const [comments, setComments] = useState<PostComment[]>([]);
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const currentUser = useAppSelector((state) => state.auth.currentUser);

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getAllPosts = async () => {
            try {
                const response = await getAllPostsRequest(accessToken, source);
                setPosts(getApprovedPosts(sortDesc(response[0].data)));
                setLikes(response[1].data);
                setComments(response[2].data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Data fetching cancelled');
                } else {
                    console.log(error);
                }
            }
        };
        getAllPosts();
        return () => source.cancel('Data fetching cancelled');
    }, [accessToken]);

    useEffect(() => {
        const data = route.params && route.params.data;
        if (data) {
            if (data.createdAt !== data.updatedAt) {
                setPosts(sortDesc(posts.map((post) => (data.id === post.id ? data : post))));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.params]);

    const handleShowImage = (photos: Photo[]) => {
        navigation.navigate('ShowImage', {
            photos
        });
    };

    const handleEdit = (postId: Number) => {
        navigation.navigate('AddPost', {
            editedId: postId
        });
    };

    const handleDelete = async (postId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/posts/${postId}`, config);
            if (response.status === 200) {
                const newPosts = posts?.filter((item) => item.id !== postId);
                setPosts(newPosts);
                return;
            } else {
                throw new Error('Failed to delete a post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRefresh = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllPostsRequest(accessToken);
            if (response[0].status === 200) {
                setPosts(getApprovedPosts(sortDesc(response[0].data)));
            } else {
                throw new Error('Failed to refresh posts');
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, [accessToken]);

    const handleLikePost = async (postId: Number) => {
        try {
            const response = await axiosInstance.post(
                `api/posts/${postId}/likes`,
                {
                    author: currentUser,
                    postId
                },
                config
            );
            if (response.status === 201) {
                setLikes(likes.concat(response.data));
            } else {
                throw new Error('Failed to like post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnlikePost = async (likeId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/likes/${likeId}`, config);
            if (response.status === 200) {
                setLikes(likes.filter((like) => like.id !== likeId));
            } else {
                throw new Error('Failed to unlike post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddNewComment = async (postId: Number) => {
        try {
            const response = await axiosInstance.post(
                `api/posts/${postId}/comments`,
                {
                    author: currentUser,
                    postId,
                    content
                },
                config
            );
            if (response.status === 201) {
                setContent('');
                setComments(comments.concat(response.data));
            } else {
                throw new Error('Failed to comment on post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/comments/${commentId}`, config);
            if (response.status === 200) {
                setComments(comments.filter((comment) => comment.id !== commentId));
            } else {
                throw new Error('Failed to delete comment of post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditComment = async (commentId: Number) => {
        try {
            const response = await axiosInstance.patch(
                `api/comments/${commentId}`,
                {
                    content: editContent
                },
                config
            );

            if (response.status === 200) {
                setEditContent('');
                setComments(
                    comments.map((comment) =>
                        response.data.id === comment.id ? response.data : comment
                    )
                );
                return true;
            } else {
                throw new Error('Failed to update comment of post');
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return (
        <HomeScreen
            posts={posts}
            loading={loading}
            likes={likes}
            comments={comments}
            content={content}
            editContent={editContent}
            onRefresh={handleRefresh}
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
