/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressiveImage from './ProgressiveImage';

const PostCard = ({item, onPress}: {item: Post; onPress: () => void}) => {
    const numberOfLikes = item.likes.length;
    const numberOfComments = item.comments.length;
    const likeIcon = numberOfLikes ? 'heart' : 'heart-outline';
    const likeIconColor = numberOfLikes ? '#2e64e5' : '#333';
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
        <View style={styles.card}>
            <View style={styles.userInfo}>
                <Image
                    defaultSource={require('../assets/default-avatar.jpg')}
                    source={{
                        uri: item.author.avatar
                    }}
                    style={styles.avatar}
                />
                <View style={styles.userInfoText}>
                    <Text style={styles.userName}>{item.author.name}</Text>
                    <Text style={styles.postTime}>2 hours ago</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onPress}>
                <ProgressiveImage
                    defaultImageSource={require('../assets/default-img.jpg')}
                    source={{uri: item.author.avatar}}
                    style={{width: '100%', height: 250}}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postText}>{item.content}</Text>
            <View style={styles.divider} />
            <View style={styles.interactionWrapper}>
                <TouchableOpacity
                    style={[
                        styles.interaction,
                        {
                            backgroundColor: numberOfLikes
                                ? '#2e64e515'
                                : 'transparent'
                        }
                    ]}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <Text
                        style={[
                            styles.interactionText,
                            {color: numberOfLikes ? '#2e64e5' : '#333'}
                        ]}>
                        {likeText}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interaction}>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <Text style={styles.interactionText}>{commentText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginBottom: 20,
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
        color: '#666'
    },
    postTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    postText: {
        fontSize: 14,
        marginBottom: 15,
        paddingHorizontal: 15
    },
    divider: {
        alignSelf: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: 15,
        width: '92%'
    },
    interactionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
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
    }
});

export default PostCard;
