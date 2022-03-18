import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import PostCard from '../../components/PostCard';
import { Screens } from '../../constants/screens';
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
  const [loading, setLoading] = useState(false);
  const posts = useAppSelector((state) => selectPosts(state));
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => selectCurrentUser(state));

  const getMyPosts = (arr: Post[]) =>
    currentUser?.role === 'admin'
      ? arr.filter((post) => post.pending)
      : arr.filter((post) => post.author.id === currentUser?.id);

  const handleDelete = (postId: number) => {
    dispatch(postActions.deletePost(postId));
  };

  const handleApprovePost = (postId: number) => {
    dispatch(postActions.approvePendingPost({ postId, pending: false }));
  };

  const handleRejectPost = (postId: number) => {
    dispatch(postActions.deletePost(postId));
  };

  const handleRefresh = () => {
    setLoading(true);
    dispatch(postActions.fetchData(() => setLoading(false)));
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={handleRefresh}
        data={getMyPosts(posts)}
        renderItem={({ item }: { item: Post }) => (
          <PostCard
            item={item}
            onShowImage={() =>
              navigation.navigate(Screens.SHOW_IMAGE_SCREEN.name, {
                photos: item.photos
              })
            }
            onDelete={() => handleDelete(item.id || 0)}
            onEdit={() =>
              navigation.navigate(Screens.EDIT_POST_SCREEN.name, {
                isMyPost: true,
                editedPost: item
              })
            }
            isMyPost={true}
            onApprovePost={() => handleApprovePost(item.id || 0)}
            onRejectPost={() => handleRejectPost(item.id || 0)}
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
