import React from 'react';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import PostCard from '../../components/PostCard';
import { styles } from '../../styles/HomeScreenStyles';

type HomeScreenProps = {
    posts: Post[];
    loading: boolean;
    likes: PostLike[];
    comments: PostComment[];
    content: string;
    editContent: string;
    onRefresh: () => void;
    onShowImage: (photos: Photo[]) => void;
    onEdit: (postId: Number) => void;
    onDelete: (postId: Number) => void;
    onLikePost: (postId: Number) => void;
    onUnlikePost: (likeId: Number) => void;
    onSetContent: (value: string) => void;
    onSetEditContent: (value: string) => void;
    onAddNewComment: (postId: Number) => void;
    onDeleteComment: (commentId: Number) => void;
    onEditComment: (commentId: Number) => Promise<boolean>;
};

const HomeScreen = ({
    posts,
    loading,
    likes,
    comments,
    content,
    editContent,
    onRefresh,
    onShowImage,
    onEdit,
    onDelete,
    onLikePost,
    onUnlikePost,
    onSetContent,
    onSetEditContent,
    onAddNewComment,
    onDeleteComment,
    onEditComment
}: HomeScreenProps) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                refreshing={loading}
                onRefresh={onRefresh}
                renderItem={({ item }: { item: Post }) => (
                    <PostCard
                        item={item}
                        onShowImage={onShowImage}
                        onDelete={() => onDelete(item.id)}
                        onEdit={() => onEdit(item.id)}
                        likesOfItem={likes.filter((like) => Number(like.postId) === item.id)}
                        commentsOfItem={comments.filter(
                            (comment) => Number(comment.postId) === item.id
                        )}
                        onLikePost={onLikePost}
                        onUnlikePost={onUnlikePost}
                        content={content}
                        onSetContent={onSetContent}
                        onAddNewComment={onAddNewComment}
                        onDeleteComment={onDeleteComment}
                        editContent={editContent}
                        onSetEditContent={onSetEditContent}
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
