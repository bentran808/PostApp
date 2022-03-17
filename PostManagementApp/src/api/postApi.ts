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
  },
  editPostRequest(postId: number, data: Post | { pending: boolean }) {
    return axiosInstance.patch(`api/posts/${postId}`, data);
  },
  deletePostRequest(postId: number) {
    return axiosInstance.delete(`api/posts/${postId}`);
  },
  likePostRequest(postId: number, currentUser: User) {
    return axiosInstance.post(`api/posts/${postId}/likes`, {
      author: currentUser,
      postId
    });
  },
  unlikePostRequest(likeId: number) {
    return axiosInstance.delete(`api/likes/${likeId}`);
  },
  addCommentRequest(postId: number, currentUser: User, content: string) {
    return axiosInstance.post(`api/posts/${postId}/comments`, {
      author: currentUser,
      postId,
      content
    });
  },
  editCommentRequest(commentId: number, newContent: string) {
    return axiosInstance.patch(`api/comments/${commentId}`, {
      content: newContent
    });
  },
  deleteCommentRequest(commentId: number) {
    return axiosInstance.delete(`api/comments/${commentId}`);
  }
};
