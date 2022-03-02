import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PostCard from '../components/PostCard';

// Utilities
import {axiosInstance} from '../utils/AxiosConfig';

type ShowImageNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ShowImage'
>;

interface ShowImageProps {
    navigation: ShowImageNavigationProp;
}

const HomeScreen = ({navigation}: ShowImageProps) => {
    const [posts, setPosts] = useState<Post[]>();

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getAllPosts = async () => {
            try {
                const response = await axiosInstance.get('api/posts', {
                    cancelToken: source.token,
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE2NDYyMTgyOTksImV4cCI6MTY0NjIyMTg5OX0.BuVmGNgc11rbcnEBgVfKIJtOmRMXleJrCTOAK8bVmSA'
                    }
                });
                if (response.status === 200) {
                    setPosts(response.data);
                    return;
                } else {
                    throw new Error('Failed to fetch users');
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Data fetching cancelled');
                } else {
                    console.log(error);
                }
            }
        };
        getAllPosts();
        return () => source.cancel('Data fetching cancelled');
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({item}: {item: Post}) => (
                    <PostCard
                        item={item}
                        onPress={() =>
                            navigation.navigate('ShowImage', {
                                url: {
                                    uri: item.author.avatar
                                }
                            })
                        }
                    />
                )}
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
    }
});

export default HomeScreen;
