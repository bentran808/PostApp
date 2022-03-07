import {CancelTokenSource} from 'axios';
import {axiosInstance} from './AxiosConfig';

const getAllPostsRequest = async (
    user: {access_token: string; data: User},
    source?: CancelTokenSource
) => {
    const config = {
        cancelToken: source?.token,
        headers: {
            Authorization: `Bearer ${user.access_token}`
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

const getApprovedPosts = (arr: Post[]) => arr.filter(item => !item.pending);

export {getAllPostsRequest, sortDesc, formatPrice, getApprovedPosts};
