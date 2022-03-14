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
            const postsData = response[0].data;
            const postsById = sortDesc(postsData).map((item) => item.id || 0);
            const posts: { [key: number]: Post } = {};

            for (const key in postsData) {
                const postItem = postsData[key];
                const postId = postItem.id || 0;

                if (postId && !posts.hasOwnProperty(postId)) {
                    posts[postId] = postItem;
                }
            }

            const likes = response[1].data;
            const comments = response[2].data;
            yield put(postActions.fetchDataSuccess({ postsById, posts, likes, comments }));
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
            const newPost = response.data;
            const postId = newPost.id;

            if (postId && newPost) {
                yield put(postActions.addPostSuccess({ postId, newPost }));
            }
        }
    } catch (error) {
        if (error) {
            yield put(postActions.addPostFailed('Add a new post failed'));
        }
    }
}

function* handleEditPost(postId: number, payload: Post) {
    try {
        const response: { data: Post } = yield call(postApi.editPostRequest, postId, payload);

        if (response) {
            yield put(postActions.editPostSuccess({ postId, editedPost: response.data }));
        }
    } catch (error) {
        if (error) {
            yield put(postActions.editPostFailed('Update a post failed'));
        }
    }
}

function* handleDeletePost(postId: number) {
    try {
        const response: { status: number } = yield call(postApi.deletePostRequest, postId);
        if (response.status === 200) {
            yield put(postActions.deletePostSuccess(postId));
        }
    } catch (error) {
        if (error) {
            yield put(postActions.deletePostFailed('Delete a post failed'));
        }
    }
}

function* handleApprovePendingPost(postId: number, pending: boolean) {
    try {
        const response: { data: Post } = yield call(postApi.editPostRequest, postId, { pending });

        if (response) {
            yield put(postActions.approvePendingPostSuccess({ postId, editedPost: response.data }));
        }
    } catch (error) {
        if (error) {
            yield put(postActions.approvePendingPostFailed('Update a post failed'));
        }
    }
}

function* watchPostManagementFlow() {
    const isLoggedIn: string = yield call(getAccessToken);

    if (isLoggedIn) {
        yield take(postActions.fetchData.type);
        yield call(handleFetchData);

        const addAction: PayloadAction<Post> = yield take(postActions.addPost.type);
        yield call(handleAddPost, addAction.payload);

        const editAction: PayloadAction<{ postId: number; editedPost: Post }> = yield take(
            postActions.editPost.type
        );
        yield call(handleEditPost, editAction.payload.postId, editAction.payload.editedPost);

        const deleteAction: PayloadAction<number> = yield take(postActions.deletePost.type);
        yield call(handleDeletePost, deleteAction.payload);

        const approveAction: PayloadAction<{ postId: number; pending: boolean }> = yield take(
            postActions.approvePendingPost.type
        );

        yield call(
            handleApprovePendingPost,
            approveAction.payload.postId,
            approveAction.payload.pending
        );
    }
}

export default function* postSaga() {
    yield fork(watchPostManagementFlow);
}
