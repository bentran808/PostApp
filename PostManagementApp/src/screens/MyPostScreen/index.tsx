import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import PostCard from '../../components/PostCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postActions, selectCurrentUser, selectPosts } from '../../redux/slices';

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
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => selectCurrentUser(state));

    const getMyPosts = (arr: Post[]) =>
        currentUser?.role === 'admin'
            ? arr.filter((post) => post.pending)
            : arr.filter((post) => post.author.id === currentUser?.id);

    const onDelete = (postId: number) => {
        dispatch(postActions.deletePost(postId));
    };

    const approvePost = (postId: number) => {
        dispatch(postActions.approvePendingPost({ postId, pending: false }));
    };

    const rejectPost = (postId: number) => {
        dispatch(postActions.deletePost(postId));
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
                                editedPost: item
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
