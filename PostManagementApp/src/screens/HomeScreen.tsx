import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios, {CancelTokenSource} from 'axios';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PostCard from '../components/PostCard';
import {CounterContext} from '../navigation/CounterContext';

// Utilities
import {axiosInstance} from '../utils/AxiosConfig';

type ShowImageNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ShowImage'
>;

interface ShowImageProps {
    navigation: ShowImageNavigationProp;
}

const getAllPostsRequest = async (
    user: {access_token: string; data: User},
    source?: CancelTokenSource
) =>
    await axiosInstance.get('api/posts', {
        cancelToken: source?.token,
        headers: {
            Authorization: `Bearer ${user.access_token}`
        }
    });

const sortDesc = (arr: Post[]) => {
    return arr.sort((a, b) => (a.id < b.id ? 1 : -1));
};

const HomeScreen = ({navigation}: ShowImageProps) => {
    const [posts, setPosts] = useState<Post[]>();
    const [loading, setLoading] = useState(false);
    const {user} = useContext(CounterContext);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getAllPosts = async () => {
            try {
                const response = await getAllPostsRequest(user, source);
                if (response.status === 200) {
                    setPosts(sortDesc(response.data));
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

    const onDelete = async (postId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            });
            if (response.status === 200) {
                const newPosts = posts?.filter(item => item.id !== postId);
                setPosts(newPosts);
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

    const onRefresh = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAllPostsRequest(user);
            if (response.status === 200) {
                setPosts(sortDesc(response.data));
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }, [user]);

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
                    />
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
