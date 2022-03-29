import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import PostCard from 'components/PostCard';
import { Screens } from 'constants/screens';
import { useAppDispatch, useAppSelector } from 'hooks';
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

  const handleShowImage = (photos: Photo[]) => {
    navigation.navigate(Screens.SHOW_IMAGE_SCREEN.name as 'ShowImageScreen', {
      photos
    });
  };

  const handleEdit = (item: Post) => {
    navigation.navigate(Screens.EDIT_POST_SCREEN.name as 'EditPostScreen', {
      isMyPost: true,
      editedPost: item
    });
  };

  const renderItem = ({ item }: { item: Post }) => (
    <PostCard
      item={item}
      onShowImage={handleShowImage}
      onDelete={handleDelete}
      onEdit={handleEdit}
      isMyPost={true}
      onApprovePost={handleApprovePost}
      onRejectPost={handleRejectPost}
    />
  );

  const renderEmptyList = () => <Text>There are no posts to approve</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        testID="postsList"
        refreshing={loading}
        onRefresh={handleRefresh}
        data={getMyPosts(posts)}
        initialNumToRender={5}
        keyExtractor={(item) => (item.id || 0).toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
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
