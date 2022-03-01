/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const posts = [
    {
        author: {
            id: '621c4188dece66a40dad2951',
            avatar: 'https://picsum.photos/200',
            name: 'Admin',
            gender: 'male',
            email: 'admin@admin.com',
            phone: '+84 (919) 507231',
            address: '199 Bergen Street, Bowie, Oregon, 7933',
            role: 'admin'
        },
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        content:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        photos: [],
        likes: [],
        comments: [],
        createdAt: 1646127024449,
        updatedAt: 1646127024449,
        id: 1
    },
    {
        author: {
            id: '621c4188dece66a40dad2951',
            avatar: 'https://picsum.photos/200',
            name: 'Admin',
            gender: 'male',
            email: 'admin@admin.com',
            phone: '+84 (919) 507231',
            address: '199 Bergen Street, Bowie, Oregon, 7933',
            role: 'admin'
        },
        title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        content:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        photos: [],
        likes: [],
        comments: [],
        createdAt: 1646127024449,
        updatedAt: 1646127024449,
        id: 2
    }
];

const PostCard = ({item}: {item: Post}) => {
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
const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({item}: {item: Post}) => <PostCard item={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20
    },
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
export default HomeScreen;
