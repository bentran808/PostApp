import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, take } from 'redux-saga/effects';
import { postApi } from '../../api/postApi';
import { getAccessToken, sortDesc } from '../../utils/helpers';
import { postActions } from './../slices/postSlices';

function* handleFetchData() {
    try {
        const response: [{ data: Post[] }, { data: PostLike[] }, { data: PostComment[] }] =
            yield all([
                postApi.fetchPostsRequest(),
                postApi.fetchLikesRequest(),
                postApi.fetchCommentsRequest()
            ]);
        if (response) {
            const posts = sortDesc(response[0].data);
            const likes = response[1].data;
            const comments = response[2].data;
            yield put(postActions.fetchDataSuccess({ posts, likes, comments }));
        }
    } catch (error) {
        if (error) {
            yield put(postActions.fetchDataFailed('Fetch data failed'));
        }
    }
}

function* handleAddPost(payload: Post) {
    try {
        const response: { data: Post } = yield call(postApi.addPostRequest, payload);
        if (response) {
            yield put(postActions.addPostSuccess(response.data));
        }
    } catch (error) {
        if (error) {
            yield put(postActions.addPostFailed('Add a new post failed'));
        }
    }
}

function* watchPostManagementFlow() {
    const isLoggedIn: string = yield call(getAccessToken);

    if (isLoggedIn) {
        yield take(postActions.fetchData.type);
        yield call(handleFetchData);

        const action: PayloadAction<Post> = yield take(postActions.addPost.type);
        yield fork(handleAddPost, action.payload);
    }
}

export default function* postSaga() {
    yield fork(watchPostManagementFlow);
}
