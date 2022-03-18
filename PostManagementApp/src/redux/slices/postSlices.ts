import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PostState {
  loading: boolean;
  postsById: number[];
  posts: { [key: number]: Post };
  likes: PostLike[];
  comments: PostComment[];
  errorMessage: string;
}

const initialState: PostState = {
  loading: false,
  postsById: [],
  posts: {},
  likes: [],
  comments: [],
  errorMessage: ''
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchData(state, _action: PayloadAction<() => void>) {
      state.loading = true;
      state.errorMessage = '';
    },
    fetchDataSuccess(
      state,
      _action: PayloadAction<{
        postsById: number[];
        posts: { [key: number]: Post };
        likes: PostLike[];
        comments: PostComment[];
      }>
    ) {
      state.loading = false;
      state.postsById = _action.payload.postsById;
      state.posts = _action.payload.posts;
      state.likes = _action.payload.likes;
      state.comments = _action.payload.comments;
    },
    fetchDataFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    addPost(
      state,
      _action: PayloadAction<{ params: Post; callback: (data: Post | null, error: any) => void }>
    ) {
      state.loading = true;
      state.errorMessage = '';
    },
    addPostSuccess(state, _action: PayloadAction<{ postId: number; newPost: Post }>) {
      state.loading = false;
      state.postsById.unshift(_action.payload.postId);
      state.posts[_action.payload.postId] = _action.payload.newPost;
    },
    addPostFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    editPost(
      state,
      _action: PayloadAction<{
        postId: number;
        editedPost: Post;
        callback: (data: Post | null, error: any) => void;
      }>
    ) {
      state.loading = true;
      state.errorMessage = '';
    },
    editPostSuccess(state, _action: PayloadAction<{ postId: number; editedPost: Post }>) {
      state.loading = false;
      state.posts[_action.payload.postId] = _action.payload.editedPost;
    },
    editPostFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    deletePost(state, _action: PayloadAction<number>) {
      state.loading = true;
      state.errorMessage = '';
    },
    deletePostSuccess(state, _action: PayloadAction<number>) {
      state.loading = false;
      delete state.posts[_action.payload];
      state.postsById = state.postsById.filter((item) => item !== _action.payload);
      state.likes = state.likes.filter((item) => item.postId !== _action.payload);
      state.comments = state.comments.filter((item) => item.postId !== _action.payload);
    },
    deletePostFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    approvePendingPost(state, _action: PayloadAction<{ postId: number; pending: boolean }>) {
      state.loading = true;
      state.errorMessage = '';
    },
    approvePendingPostSuccess(state, _action: PayloadAction<{ postId: number; editedPost: Post }>) {
      state.loading = false;
      state.posts[_action.payload.postId] = _action.payload.editedPost;
    },
    approvePendingPostFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    likePost(state, _action: PayloadAction<{ postId: number; currentUser: User }>) {
      state.loading = true;
      state.errorMessage = '';
    },
    likePostSuccess(state, _action: PayloadAction<PostLike>) {
      state.loading = false;
      state.likes.push(_action.payload);
    },
    likePostFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    unlikePost(state, _action: PayloadAction<number>) {
      state.loading = true;
      state.errorMessage = '';
    },
    unlikePostSuccess(state, _action: PayloadAction<number>) {
      state.loading = false;
      state.likes = state.likes.filter((item) => item.id !== _action.payload);
    },
    unlikePostFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    addComment(
      state,
      _action: PayloadAction<{ postId: number; currentUser: User; content: string }>
    ) {
      state.loading = true;
      state.errorMessage = '';
    },
    addCommentSuccess(state, _action: PayloadAction<PostComment>) {
      state.loading = false;
      state.comments.push(_action.payload);
    },
    addCommentFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    editComment(state, _action: PayloadAction<{ commentId: number; newContent: string }>) {
      state.loading = true;
      state.errorMessage = '';
    },
    editCommentSuccess(state, _action: PayloadAction<PostComment>) {
      state.loading = false;
      state.comments = state.comments.map((comment) =>
        _action.payload.id === comment.id ? _action.payload : comment
      );
    },
    editCommentFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    },
    deleteComment(state, _action: PayloadAction<number>) {
      state.loading = true;
      state.errorMessage = '';
    },
    deleteCommentSuccess(state, _action: PayloadAction<number>) {
      state.loading = false;
      state.comments = state.comments.filter((item) => item.id !== _action.payload);
    },
    deleteCommentFailed(state, _action: PayloadAction<string>) {
      state.loading = false;
      state.errorMessage = _action.payload;
    }
  }
});

// Actions
export const postActions = postSlice.actions;

// Selectors
export const selectPosts = (state: RootState) => {
  const posts: Post[] = [];
  state.post.postsById.forEach((item) => {
    if (state.post.posts.hasOwnProperty(item)) {
      posts.push(state.post.posts[item]);
    }
  });

  return posts;
};
export const selectLikes = (state: RootState) => state.post.likes;
export const selectComments = (state: RootState) => state.post.comments;

// Reducer
const postReducer = postSlice.reducer;

export default postReducer;
