import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PostState {
    loading: boolean;
    posts: Post[];
    likes: PostLike[];
    comments: PostComment[];
    errorMessage: string;
}

const initialState: PostState = {
    loading: false,
    posts: [],
    likes: [],
    comments: [],
    errorMessage: ''
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true;
            state.errorMessage = '';
        },
        fetchDataSuccess(
            state,
            _action: PayloadAction<{
                posts: Post[];
                likes: PostLike[];
                comments: PostComment[];
            }>
        ) {
            state.loading = false;
            state.posts = _action.payload.posts;
            state.likes = _action.payload.likes;
            state.comments = _action.payload.comments;
        },
        fetchDataFailed(state, _action: PayloadAction<string>) {
            state.loading = false;
            state.errorMessage = _action.payload;
        },
        addPost(state, _action: PayloadAction<Post>) {
            state.loading = true;
            state.errorMessage = '';
        },
        addPostSuccess(state, _action: PayloadAction<Post>) {
            state.loading = false;
            state.posts.unshift(_action.payload);
        },
        addPostFailed(state, _action: PayloadAction<string>) {
            state.loading = false;
            state.errorMessage = _action.payload;
        }
    }
});

// Actions
export const postActions = postSlice.actions;

// Selectors
export const selectPosts = (state: RootState) => state.post.posts;
export const selectLikes = (state: RootState) => state.post.likes;
export const selectComments = (state: RootState) => state.post.comments;

// Reducer
const postReducer = postSlice.reducer;

export default postReducer;
