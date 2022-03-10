import AsyncStorage from '@react-native-async-storage/async-storage';
import { CancelTokenSource } from 'axios';
import { axiosInstance } from '../api';

const getAllPostsRequest = async (access_token: string | null, source?: CancelTokenSource) => {
    const config = {
        cancelToken: source?.token,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };
    const concurrentRequests = [
        axiosInstance.get('api/posts', config),
        axiosInstance.get('api/likes', config),
        axiosInstance.get('api/comments', config)
    ];
    return Promise.all(concurrentRequests);
};

const sortDesc = (arr: Post[]) => {
    return arr.sort((a, b) => (a.id < b.id ? 1 : -1));
};

const formatPrice = (price: Number) => {
    return price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
};

const getApprovedPosts = (arr: Post[]) => arr.filter((item) => !item.pending);

const setAccessToken = async (access_token: string) =>
    await AsyncStorage.setItem('access_token', access_token);

const getAccessToken = async () => await AsyncStorage.getItem('access_token');

const removeAccessToken = async () => await AsyncStorage.removeItem('access_token');

export {
    getAllPostsRequest,
    sortDesc,
    formatPrice,
    getApprovedPosts,
    setAccessToken,
    getAccessToken,
    removeAccessToken
};
