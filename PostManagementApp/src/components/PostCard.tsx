/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from 'react-native-hook-image-slider';
import { Button, Colors, Menu, TextInput } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { useAppSelector } from '../hooks';
import { selectCurrentUser } from '../redux/slices';
import { DefaultAvatar } from '../theme/Images';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { formatPrice } from '../utils/helpers';

type PostCardProps = {
    item: Post;
    isMyPost?: Boolean;
    likesOfItem?: PostLike[];
    commentsOfItem?: PostComment[];
    content?: string;
    editContent?: string;
    onShowImage: (photos: Photo[]) => void;
    onEdit: () => void;
    onDelete: () => void;
    onLikePost?: (postId: number) => void;
    onUnlikePost?: (likeId: number) => void;
    onSetContent?: (value: string) => void;
    onSetEditContent?: (value: string) => void;
    onAddNewComment?: (postId: number) => void;
    onDeleteComment?: (commentId: number) => void;
    onEditComment?: (commentId: number) => Promise<boolean>;
    approvePost?: () => void;
    rejectPost?: () => void;
};

const PostCard = ({
    item,
    isMyPost = false,
    likesOfItem = [],
    commentsOfItem = [],
    content = '',
    editContent = '',
    onShowImage,
    onEdit,
    onDelete,
    onLikePost = () => {},
    onUnlikePost = () => {},
    onSetContent = () => {},
    onSetEditContent = () => {},
    onAddNewComment = () => {},
    onDeleteComment = () => {},
    onEditComment = async () => false,
    approvePost = () => {},
    rejectPost = () => {}
}: PostCardProps) => {
    const [visible, setVisible] = useState('');
    const [visibleDetails, setVisibleDetails] = useState(false);
    const [visibleComment, setVisibleComment] = useState(false);
    const [editComment, setEditComment] = useState('');
    const currentUser = useAppSelector((state) => selectCurrentUser(state));
    const userId = currentUser?.id;
    const isAdmin = currentUser?.role === 'admin';
    const isAuthor = userId === item.author.id || isAdmin;
    const likedPost = likesOfItem.find((like) => like.author.id === userId);
    const numberOfLikes = likesOfItem.length;
    const numberOfComments = commentsOfItem.length;
    const likeIcon = likedPost ? 'heart' : 'heart-outline';
    const likeIconColor = likedPost ? colors.royalBlue : colors.nightRider;
    let likeText = 'Like';
    let commentText = 'Comment';

    if (numberOfLikes === 1) {
        likeText = '1 Like';
    } else if (numberOfLikes > 1) {
        likeText = numberOfLikes + ' Likes';
    }

    if (numberOfComments === 1) {
        commentText = '1 Comment';
    } else if (numberOfComments > 1) {
        commentText = numberOfComments + ' Comments';
    }

    return (
        <View style={styles.card} key={`Post-${item.id}`}>
            <TouchableOpacity onPress={() => onShowImage(item.photos)}>
                <View style={{ width: windowWidth * 0.9 }}>
                    <Slider
                        images={item.photos.map((photo: { uri: string }) => photo.uri)}
                        imageHeight={200}
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.infoSection}>
                <View>
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <Text style={styles.postPrice}>{formatPrice(Number(item.price))}</Text>
                    <Text style={styles.postTime}>
                        {moment(new Date(item.updatedAt || 0)).fromNow()}
                    </Text>
                    <View style={styles.postLocation}>
                        <Ionicons name="md-location-outline" size={20} color={Colors.black} />
                        <Text style={styles.postAddress}>{item.address}</Text>
                    </View>
                </View>
                {isAuthor && (
                    <Menu
                        visible={visible === `post-${item.id}`}
                        onDismiss={() => setVisible('')}
                        anchor={
                            <TouchableOpacity onPress={() => setVisible(`post-${item.id}`)}>
                                <Ionicons name="ellipsis-vertical" size={20} color={Colors.black} />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item
                            onPress={() => {
                                setVisible('');
                                onEdit();
                            }}
                            title="Edit"
                        />
                        <Menu.Item
                            onPress={() => {
                                setVisible('');
                                onDelete();
                            }}
                            title="Delete"
                        />
                    </Menu>
                )}
            </View>
            {visibleDetails && (
                <>
                    <View style={styles.divider} />
                    <View style={styles.userInfo}>
                        <Image
                            defaultSource={DefaultAvatar}
                            source={{
                                uri: item.author.avatar
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.userInfoText}>
                            <Text style={styles.userName}>{item.author.name}</Text>
                        </View>
                    </View>
                    <Text style={styles.postText}>{item.description}</Text>
                    <View style={styles.postLocation}>
                        <FontAwesome name="building-o" size={20} color={Colors.black} />
                        <Text style={styles.postAddress}>Product Company: {item.company}</Text>
                    </View>
                    <View style={styles.postLocation}>
                        <Ionicons name="pricetags-outline" size={20} color={Colors.black} />
                        <Text style={styles.postAddress}>Type of product: {item.type}</Text>
                    </View>
                    <View style={styles.postLocation}>
                        <Ionicons name="md-calendar-outline" size={20} color={Colors.black} />
                        <Text style={styles.postAddress}>Year of registration: {item.year}</Text>
                    </View>
                    <View style={styles.postLocation}>
                        <Ionicons name="md-card-outline" size={20} color={Colors.black} />
                        <Text style={styles.postAddress}>
                            Status: {item.status ? 'Used' : 'New'}
                        </Text>
                    </View>
                </>
            )}
            <Button
                color={colors.nightRider}
                icon={visibleDetails ? 'chevron-up' : 'chevron-down'}
                style={{
                    paddingVertical: 0,
                    marginVertical: 0
                }}
                labelStyle={{
                    fontSize: 12
                }}
                uppercase={false}
                onPress={() => setVisibleDetails(!visibleDetails)}
            >
                {visibleDetails ? 'Show less' : 'Show more'}
            </Button>
            {isMyPost ? (
                isAdmin ? (
                    <>
                        <View style={styles.divider} />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                paddingVertical: 10
                            }}
                        >
                            <Button
                                mode="contained"
                                icon="check"
                                color={colors.royalBlue}
                                onPress={approvePost}
                            >
                                Approve
                            </Button>
                            <Button
                                mode="contained"
                                icon="close"
                                color={colors.freeSpeechRed}
                                onPress={rejectPost}
                            >
                                Reject
                            </Button>
                        </View>
                    </>
                ) : (
                    item.pending && (
                        <>
                            <View style={styles.divider} />
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>
                                This post is pending approval
                            </Text>
                        </>
                    )
                )
            ) : (
                <>
                    <View style={styles.divider} />
                    <View style={styles.interactionWrapper}>
                        <TouchableOpacity
                            onPress={() =>
                                likedPost ? onUnlikePost(likedPost.id) : onLikePost(item.id || 0)
                            }
                            style={[
                                styles.interaction,
                                {
                                    backgroundColor: likedPost ? '#2e64e515' : 'transparent'
                                }
                            ]}
                        >
                            <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                            <Text style={[styles.interactionText, { color: likeIconColor }]}>
                                {likeText}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.interaction}
                            onPress={() => setVisibleComment(true)}
                        >
                            <Ionicons name="md-chatbubble-outline" size={25} />
                            <Text style={styles.interactionText}>{commentText}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
            {visibleComment && (
                <>
                    {numberOfComments ? <View style={styles.divider} /> : undefined}
                    <FlatList
                        data={commentsOfItem}
                        renderItem={(props) => {
                            const isAuthorComment = props.item.author.id === userId || isAdmin;
                            return (
                                <View style={styles.commentWrapper}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View style={styles.commentInfo}>
                                            <Image
                                                defaultSource={DefaultAvatar}
                                                source={{
                                                    uri: props.item.author.avatar
                                                }}
                                                style={styles.commentAvatar}
                                            />
                                            <Text style={styles.commentUserName}>
                                                {props.item.author.name}
                                            </Text>
                                            <Text style={styles.postTime}>
                                                {moment(
                                                    new Date(props.item.updatedAt || 0)
                                                ).fromNow()}
                                            </Text>
                                        </View>
                                        {isAuthorComment && (
                                            <Menu
                                                visible={visible === `comment-${props.item.id}`}
                                                onDismiss={() => setVisible('')}
                                                anchor={
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            setVisible(`comment-${props.item.id}`)
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="ellipsis-vertical"
                                                            size={16}
                                                            color={Colors.black}
                                                        />
                                                    </TouchableOpacity>
                                                }
                                            >
                                                <Menu.Item
                                                    onPress={() => {
                                                        setVisible('');
                                                        setEditComment(`comment-${props.item.id}`);
                                                        onSetEditContent(props.item.content);
                                                    }}
                                                    title="Edit"
                                                />
                                                <Menu.Item
                                                    onPress={() => {
                                                        setVisible('');
                                                        onDeleteComment(props.item.id);
                                                    }}
                                                    title="Delete"
                                                />
                                            </Menu>
                                        )}
                                    </View>
                                    {editComment === `comment-${props.item.id}` ? (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingHorizontal: 15
                                            }}
                                        >
                                            <TextInput
                                                mode="outlined"
                                                value={editContent}
                                                activeOutlineColor={colors.royalBlue}
                                                style={{
                                                    width: windowWidth / 2,
                                                    height: windowHeight / 20
                                                }}
                                                onChangeText={(itemValue) =>
                                                    onSetEditContent(itemValue)
                                                }
                                                placeholder="Write a comment"
                                            />
                                            <Button
                                                color={colors.royalBlue}
                                                labelStyle={{
                                                    fontSize: 12
                                                }}
                                                uppercase={false}
                                                disabled={editContent === ''}
                                                onPress={async () => {
                                                    if (await onEditComment(props.item.id)) {
                                                        setEditComment('');
                                                    }
                                                }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                color={colors.royalBlue}
                                                labelStyle={{
                                                    fontSize: 12
                                                }}
                                                uppercase={false}
                                                onPress={() => {
                                                    setEditComment('');
                                                    onSetEditContent(props.item.content);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </View>
                                    ) : (
                                        <Text>{props.item.content}</Text>
                                    )}
                                </View>
                            );
                        }}
                    />
                    <View style={styles.divider} />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 15
                        }}
                    >
                        <TextInput
                            mode="outlined"
                            value={content}
                            activeOutlineColor={colors.royalBlue}
                            style={{
                                width: '80%',
                                height: windowHeight / 20
                            }}
                            onChangeText={(itemValue) => onSetContent(itemValue)}
                            placeholder="Write a comment"
                        />
                        <Button
                            color={colors.royalBlue}
                            uppercase={false}
                            disabled={content === ''}
                            onPress={() => onAddNewComment(item.id || 0)}
                        >
                            Send
                        </Button>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginBottom: 20,
        paddingBottom: 10,
        width: '100%'
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15
    },
    avatar: {
        borderRadius: 25,
        height: 50,
        width: 50
    },
    userInfoText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    postTime: {
        fontSize: 12,
        color: '#666',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    postTitle: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingLeft: 15
    },
    postPrice: {
        color: colors.freeSpeechRed,
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 15
    },
    postLocation: {
        flexDirection: 'row',
        paddingLeft: 15
    },
    postAddress: {
        color: Colors.black,
        fontSize: 14,
        marginLeft: 5
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    postText: {
        fontSize: 14,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    divider: {
        alignSelf: 'center',
        borderBottomColor: colors.gainsboro,
        borderBottomWidth: 1,
        marginTop: 15,
        width: '92%'
    },
    interactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingTop: 15
    },
    interaction: {
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    interactionText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 5
    },
    commentWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    commentInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    commentAvatar: {
        borderRadius: 25,
        height: 25,
        width: 25
    },
    commentUserName: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 15
    }
});

export default PostCard;
