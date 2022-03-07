/* eslint-disable react-hooks/exhaustive-deps */
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import PostCard from '../components/PostCard';
import {AppContext} from '../navigation/AppContext';

// Utilities
import {axiosInstance} from '../utils/AxiosConfig';
import {getAllPostsRequest, getApprovedPosts, sortDesc} from '../utils/helpers';

type ShowImageNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ShowImage'
>;

interface ShowImageProps {
    navigation: ShowImageNavigationProp;
    route: {
        params: {
            data: Post;
        };
    };
}

const HomeScreen = ({navigation, route}: ShowImageProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [likes, setLikes] = useState<PostLike[]>([]);
    const [comments, setComments] = useState<PostComment[]>([]);
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AppContext);
    const config = {
        headers: {
            Authorization: `Bearer ${user.access_token}`
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getAllPosts = async () => {
            try {
                const response = await getAllPostsRequest(user, source);
                if (response[0].status === 200) {
                    setPosts(getApprovedPosts(sortDesc(response[0].data)));
                    setLikes(response[1].data);
                    setComments(response[2].data);
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
        getAllPosts();
        return () => source.cancel('Data fetching cancelled');
    }, [user, user.access_token]);

    useEffect(() => {
        const data = route.params && route.params.data;
        if (data) {
            if (data.createdAt !== data.updatedAt) {
                setPosts(
                    sortDesc(
                        posts.map(post => (data.id === post.id ? data : post))
                    )
                );
            }
        }
    }, [route.params]);

    const onDelete = async (postId: Number) => {
        try {
            const response = await axiosInstance.delete(
                `api/posts/${postId}`,
                config
            );
            if (response.status === 200) {
                const newPosts = posts?.filter(item => item.id !== postId);
                setPosts(newPosts);
                return;
            } else {
                throw new Error('Failed to delete a post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onRefresh = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllPostsRequest(user);
            if (response[0].status === 200) {
                setPosts(getApprovedPosts(sortDesc(response[0].data)));
            } else {
                throw new Error('Failed to refresh posts');
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, [user]);

    const likePost = async (postId: Number) => {
        try {
            const response = await axiosInstance.post(
                `api/posts/${postId}/likes`,
                {
                    author: user.data,
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

    const unlikePost = async (likeId: Number) => {
        try {
            const response = await axiosInstance.delete(
                `api/likes/${likeId}`,
                config
            );
            if (response.status === 200) {
                setLikes(likes.filter(like => like.id !== likeId));
            } else {
                throw new Error('Failed to unlike post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addNewComment = async (postId: Number) => {
        try {
            const response = await axiosInstance.post(
                `api/posts/${postId}/comments`,
                {
                    author: user.data,
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

    const deleteComment = async (commentId: Number) => {
        try {
            const response = await axiosInstance.delete(
                `api/comments/${commentId}`,
                config
            );
            if (response.status === 200) {
                setComments(
                    comments.filter(comment => comment.id !== commentId)
                );
            } else {
                throw new Error('Failed to delete comment of post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onEditComment = async (commentId: Number) => {
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
                    comments.map(comment =>
                        response.data.id === comment.id
                            ? response.data
                            : comment
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
        <View style={styles.container}>
            <FlatList
                data={posts}
                refreshing={loading}
                onRefresh={onRefresh}
                renderItem={({item}: {item: Post}) => (
                    <PostCard
                        item={item}
                        onPress={() =>
                            navigation.navigate('ShowImage', {
                                url: {
                                    uri: item.author.avatar
                                }
                            })
                        }
                        onDelete={() => onDelete(item.id)}
                        onEdit={() =>
                            navigation.navigate('AddPost', {
                                editedId: item.id
                            })
                        }
                        likesOfItem={likes.filter(
                            like => Number(like.postId) === item.id
                        )}
                        commentsOfItem={comments.filter(
                            comment => Number(comment.postId) === item.id
                        )}
                        likePost={likePost}
                        unlikePost={unlikePost}
                        content={content}
                        setContent={setContent}
                        addNewComment={addNewComment}
                        deleteComment={deleteComment}
                        editContent={editContent}
                        setEditContent={setEditContent}
                        onEditComment={onEditComment}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text>
                        There are no posts to display. You can create new posts.
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20
    }
});

export default HomeScreen;
