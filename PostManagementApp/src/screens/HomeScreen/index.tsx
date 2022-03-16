import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import PostCard from '../../components/PostCard';
import { styles } from '../../styles/HomeScreenStyles';

type HomeScreenProps = {
    posts: Post[];
    likes: PostLike[];
    comments: PostComment[];
    onShowImage: (photos: Photo[]) => void;
    onEdit: (post: Post) => void;
    onDelete: (postId: number) => void;
    onLikePost: (postId: number) => void;
    onUnlikePost: (likeId: number) => void;
    onAddNewComment: (postId: number, value: string) => void;
    onDeleteComment: (commentId: number) => void;
    onEditComment: (commentId: number, value: string) => void;
};

const HomeScreen = ({
    posts,
    likes,
    comments,
    onShowImage,
    onEdit,
    onDelete,
    onLikePost,
    onUnlikePost,
    onAddNewComment,
    onDeleteComment,
    onEditComment
}: HomeScreenProps) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }: { item: Post }) => (
                    <PostCard
                        item={item}
                        onShowImage={onShowImage}
                        onDelete={() => onDelete(item.id || 0)}
                        onEdit={() => onEdit(item)}
                        likesOfItem={likes.filter((like) => Number(like.postId) === item.id)}
                        commentsOfItem={comments.filter(
                            (comment) => Number(comment.postId) === item.id
                        )}
                        onLikePost={onLikePost}
                        onUnlikePost={onUnlikePost}
                        onAddNewComment={onAddNewComment}
                        onDeleteComment={onDeleteComment}
                        onEditComment={onEditComment}
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
