import axios from 'axios';
import { axiosInstance } from './AxiosConfig';

const source = axios.CancelToken.source();
const config = {
    cancelToken: source?.token
};

export const postApi = {
    fetchPostsRequest() {
        return axiosInstance.get('api/posts', config);
    },
    fetchLikesRequest() {
        return axiosInstance.get('api/likes', config);
    },
    fetchCommentsRequest() {
        return axiosInstance.get('api/comments', config);
    },
    addPostRequest(data: Post) {
        return axiosInstance.post('api/posts', data);
    }
};
