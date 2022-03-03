/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProgressiveImage from './ProgressiveImage';
import {Menu} from 'react-native-paper';

type PostCardProps = {
    item: Post;
    onPress: () => void;
    onDelete: () => void;
    onEdit: () => void;
};

const PostCard = ({item, onPress, onDelete, onEdit}: PostCardProps) => {
    const [visible, setVisible] = useState(false);
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
            <TouchableOpacity onPress={onPress}>
                <ProgressiveImage
                    defaultImageSource={require('../assets/default-img.jpg')}
                    source={{uri: item.author.avatar}}
                    style={{width: '100%', height: 200}}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <View style={styles.infoSection}>
                <View>
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <Text style={styles.postPrice}>{item.price}</Text>
                    <Text style={styles.postTime}>2 hours ago</Text>
                    <View style={styles.postLocation}>
                        <Ionicons
                            name="md-location-outline"
                            size={20}
                            color="#000"
                        />
                        <Text style={styles.postAddress}>{item.address}</Text>
                    </View>
                </View>
                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Ionicons
                                name="ellipsis-vertical"
                                size={20}
                                color="#000"
                            />
                        </TouchableOpacity>
                    }>
                    <Menu.Item
                        onPress={() => {
                            setVisible(false);
                            onEdit();
                        }}
                        title="Edit"
                    />
                    <Menu.Item
                        onPress={() => {
                            setVisible(false);
                            onDelete();
                        }}
                        title="Delete"
                    />
                </Menu>
            </View>
            <View style={styles.divider} />
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
                </View>
            </View>
            <Text style={styles.postText}>{item.description}</Text>
            <View style={styles.postLocation}>
                <FontAwesome name="building-o" size={20} color="#000" />
                <Text style={styles.postAddress}>
                    Product Company: {item.company}
                </Text>
            </View>
            <View style={styles.postLocation}>
                <Ionicons name="pricetags-outline" size={20} color="#000" />
                <Text style={styles.postAddress}>
                    Type of product: {item.type}
                </Text>
            </View>
            <View style={styles.postLocation}>
                <Ionicons name="md-calendar-outline" size={20} color="#000" />
                <Text style={styles.postAddress}>
                    Year of registration: {item.year}
                </Text>
            </View>
            <View style={styles.postLocation}>
                <Ionicons name="md-card-outline" size={20} color="#000" />
                <Text style={styles.postAddress}>
                    Status: {item.status ? 'Used' : 'New'}
                </Text>
            </View>
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
        color: '#666',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    postTitle: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingLeft: 15
    },
    postPrice: {
        color: '#b80d0d',
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 15
    },
    postLocation: {
        flexDirection: 'row',
        paddingLeft: 15
    },
    postAddress: {
        color: '#000',
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
