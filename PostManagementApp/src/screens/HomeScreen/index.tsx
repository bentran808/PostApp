import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PostCard from 'components/PostCard';
import { Screens } from 'constants/screens';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getApprovedPosts } from 'utils/helpers';
import {
  postActions,
  selectComments,
  selectCurrentUser,
  selectLikes,
  selectPosts
} from '../../redux/slices';
import { styles } from './styles';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenContainerProps {
  navigation: HomeNavigationProp;
}

const HomeScreen = ({ navigation }: HomeScreenContainerProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => selectCurrentUser(state));
  const posts = useAppSelector((state) => selectPosts(state));
  const likes = useAppSelector((state) => selectLikes(state));
  const comments = useAppSelector((state) => selectComments(state));

  useEffect(() => {
    dispatch(postActions.fetchData(() => {}));
  }, [dispatch]);

  const handleShowImage = (photos: Photo[]) => {
    navigation.navigate(Screens.SHOW_IMAGE_SCREEN.name as 'ShowImageScreen', {
      photos
    });
  };

  const handleEdit = useCallback(
    (post: Post) => {
      navigation.navigate(Screens.ADD_POST_SCREEN.name as 'AddPostScreen', {
        editedPost: post
      });
    },
    [navigation]
  );

  const handleDelete = useCallback(
    (postId: number) => {
      dispatch(postActions.deletePost(postId));
    },
    [dispatch]
  );

  const handleLikePost = useCallback(
    (postId: number) => {
      dispatch(postActions.likePost({ postId, currentUser }));
    },
    [currentUser, dispatch]
  );

  const handleUnlikePost = useCallback(
    (likeId: number) => {
      dispatch(postActions.unlikePost(likeId));
    },
    [dispatch]
  );

  const handleAddNewComment = useCallback(
    (postId: number, value: string) => {
      dispatch(postActions.addComment({ postId, currentUser, content: value }));
    },
    [currentUser, dispatch]
  );

  const handleDeleteComment = useCallback(
    (commentId: number) => {
      dispatch(postActions.deleteComment(commentId));
    },
    [dispatch]
  );

  const handleEditComment = useCallback(
    (commentId: number, editContent: string) => {
      dispatch(postActions.editComment({ commentId, newContent: editContent }));
    },
    [dispatch]
  );

  const handleRefresh = useCallback(() => {
    setLoading(true);
    dispatch(postActions.fetchData(() => setLoading(false)));
  }, [dispatch]);

  const renderItem = ({ item }: { item: Post }) => (
    <PostCard
      item={item}
      onShowImage={handleShowImage}
      onDelete={handleDelete}
      onEdit={handleEdit}
      likesOfItem={likes.filter((like) => Number(like.postId) === item.id)}
      commentsOfItem={comments.filter((comment) => Number(comment.postId) === item.id)}
      onLikePost={handleLikePost}
      onUnlikePost={handleUnlikePost}
      onAddNewComment={handleAddNewComment}
      onDeleteComment={handleDeleteComment}
      onEditComment={handleEditComment}
    />
  );

  const renderEmptyList = () => (
    <Text>There are no posts to display. You can create new posts.</Text>
  );

  return (
    <View style={styles.container}>
      <FlatList
        testID="postsList"
        refreshing={loading}
        onRefresh={handleRefresh}
        data={getApprovedPosts(posts)}
        initialNumToRender={5}
        keyExtractor={(item) => (item.id || 0).toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(HomeScreen);
