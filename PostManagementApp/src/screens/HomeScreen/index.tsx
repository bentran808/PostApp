import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import PostCard from '../../components/PostCard';
import { Screens } from '../../constants/screens';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  authActions,
  postActions,
  selectComments,
  selectCurrentUser,
  selectLikes,
  selectPosts
} from '../../redux/slices';
import { styles } from '../../styles/HomeScreenStyles';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenContainerProps {
  navigation: HomeNavigationProp;
  route: {
    params: {
      data: Post;
    };
  };
}

const HomeScreen = ({ navigation }: HomeScreenContainerProps) => {
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
      navigation.navigate(Screens.LOGIN.name);
    }
  }, [dispatch, isLoggedIn, navigation]);

  const handleShowImage = (photos: Photo[]) => {
    navigation.navigate(Screens.SHOW_IMAGE_SCREEN.name, {
      photos
    });
  };

  const handleEdit = (post: Post) => {
    navigation.navigate(Screens.ADD_POST_SCREEN.name, {
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

  const handleAddNewComment = async (postId: number, value: string) => {
    dispatch(postActions.addComment({ postId, currentUser, content: value }));
  };

  const handleDeleteComment = async (commentId: number) => {
    dispatch(postActions.deleteComment(commentId));
  };

  const handleEditComment = async (commentId: number, editContent: string) => {
    dispatch(postActions.editComment({ commentId, newContent: editContent }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }: { item: Post }) => (
          <PostCard
            item={item}
            onShowImage={handleShowImage}
            onDelete={() => handleDelete(item.id || 0)}
            onEdit={() => handleEdit(item)}
            likesOfItem={likes.filter((like) => Number(like.postId) === item.id)}
            commentsOfItem={comments.filter((comment) => Number(comment.postId) === item.id)}
            onLikePost={handleLikePost}
            onUnlikePost={handleUnlikePost}
            onAddNewComment={handleAddNewComment}
            onDeleteComment={handleDeleteComment}
            onEditComment={handleEditComment}
          />
        )}
        ListEmptyComponent={() => (
          <Text>There are no posts to display. You can create new posts.</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
