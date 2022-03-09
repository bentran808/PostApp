/* eslint-disable react-hooks/exhaustive-deps */
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import { axiosInstance } from '../../api';
import PostCard from '../../components/PostCard';
import { AppContext } from '../../navigation/AppContext';
import { sortDesc } from '../../utils/helpers';

type MyPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MyPostProps {
    navigation: MyPostNavigationProp;
    route: {
        params: {
            data: Post;
        };
    };
}

const MyPostScreen = ({ navigation, route }: MyPostProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AppContext);
    const config = {
        headers: {
            Authorization: `Bearer ${user.access_token}`
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getAllPosts = async () => {
            try {
                const response = await getPosts();
                if (response.status === 200) {
                    setPosts(sortDesc(getMyPosts(response.data)));
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
        console.log('data', data);
        if (data) {
            if (data.createdAt === data.updatedAt) {
                setPosts(sortDesc(posts.concat(data)));
            } else {
                setPosts(sortDesc(posts.map((post) => (data.id === post.id ? data : post))));
            }
        }
    }, [route.params]);

    const getPosts = async () => await axiosInstance.get('api/posts', config);
    const getMyPosts = (arr: Post[]) =>
        user.data.role === 'admin'
            ? arr.filter((post) => post.pending)
            : arr.filter((post) => post.author.id === user.data.id);

    const onDelete = async (postId: Number) => {
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

    const onRefresh = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getPosts();
            if (response.status === 200) {
                setPosts(sortDesc(getMyPosts(response.data)));
            } else {
                throw new Error('Failed to refresh posts');
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, []);

    const approvePost = async (postId: Number) => {
        try {
            const response = await axiosInstance.patch(
                `api/posts/${postId}`,
                {
                    pending: false
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                }
            );
            if (response.status === 200) {
                setPosts(
                    getMyPosts(
                        posts.map((post) => (response.data.id === post.id ? response.data : post))
                    )
                );
                return;
            } else {
                throw new Error('Failed to approved a pending post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const rejectPost = async (postId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/posts/${postId}`, config);
            if (response.status === 200) {
                const newPosts = posts?.filter((item) => item.id !== postId);
                setPosts(newPosts);
                return;
            } else {
                throw new Error('Failed to reject a pending post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                refreshing={loading}
                onRefresh={onRefresh}
                renderItem={({ item }: { item: Post }) => (
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
                        isMyPost={true}
                        approvePost={() => approvePost(item.id)}
                        rejectPost={() => rejectPost(item.id)}
                    />
                )}
                ListEmptyComponent={() => <Text>There are no posts to approve</Text>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 20
    }
});

export default MyPostScreen;
