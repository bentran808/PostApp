import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import { axiosInstance } from '../../api';
import PostCard from '../../components/PostCard';
import { useAppSelector } from '../../hooks';
import { selectAccessToken, selectCurrentUser, selectPosts } from '../../redux/slices';

type MyPostNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MyPostProps {
    navigation: MyPostNavigationProp;
    route: {
        params: {
            data: Post;
        };
    };
}

const MyPostScreen = ({ navigation }: MyPostProps) => {
    const posts = useAppSelector((state) => selectPosts(state));
    const accessToken = useAppSelector((state) => selectAccessToken(state));
    const currentUser = useAppSelector((state) => selectCurrentUser(state));
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const getMyPosts = (arr: Post[]) =>
        currentUser?.role === 'admin'
            ? arr.filter((post) => post.pending)
            : arr.filter((post) => post.author.id === currentUser?.id);

    const onDelete = async (postId: Number) => {
        try {
            const response = await axiosInstance.delete(`api/posts/${postId}`, config);
            if (response.status === 200) {
                // const newPosts = posts?.filter((item) => item.id !== postId);
                // setPosts(newPosts);
                return;
            } else {
                throw new Error('Failed to delete a post');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const approvePost = async (postId: Number) => {
        try {
            const response = await axiosInstance.patch(
                `api/posts/${postId}`,
                {
                    pending: false
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            if (response.status === 200) {
                // setPosts(
                //     getMyPosts(
                //         posts.map((post) => (response.data.id === post.id ? response.data : post))
                //     )
                // );
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
                // const newPosts = posts?.filter((item) => item.id !== postId);
                // setPosts(newPosts);
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
                data={getMyPosts(posts)}
                renderItem={({ item }: { item: Post }) => (
                    <PostCard
                        item={item}
                        onShowImage={() =>
                            navigation.navigate('ShowImage', {
                                photos: item.photos
                            })
                        }
                        onDelete={() => onDelete(item.id || 0)}
                        onEdit={() =>
                            navigation.navigate('AddPost', {
                                editedId: item.id || 0
                            })
                        }
                        isMyPost={true}
                        approvePost={() => approvePost(item.id || 0)}
                        rejectPost={() => rejectPost(item.id || 0)}
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
