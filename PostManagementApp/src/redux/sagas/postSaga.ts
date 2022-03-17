import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { postApi } from '../../api/postApi';
import { sortDesc } from '../../utils/helpers';
import { postActions } from './../slices/postSlices';

function* handleFetchData() {
  try {
    const response: [{ data: Post[] }, { data: PostLike[] }, { data: PostComment[] }] = yield all([
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
    yield put(postActions.fetchDataFailed('Fetch data failed'));
  }
}

function* handleAddPost(
  action: PayloadAction<{ params: Post; callback: (data: Post | null, error: any) => void }>
) {
  try {
    const response: { data: Post } = yield call(postApi.addPostRequest, action.payload.params);
    if (response) {
      const newPost = response.data;
      const postId = newPost.id;

      if (postId && newPost) {
        yield call(action.payload.callback, response.data, null);
        yield put(postActions.addPostSuccess({ postId, newPost }));
      }
    }
  } catch (error) {
    yield call(action.payload.callback, null, error);
    yield put(postActions.addPostFailed('Add a new post failed'));
  }
}

function* handleEditPost(
  action: PayloadAction<{
    postId: number;
    editedPost: Post;
    callback: (data: Post | null, error: any) => void;
  }>
) {
  const { postId, editedPost } = action.payload;

  try {
    const response: { data: Post } = yield call(postApi.editPostRequest, postId, editedPost);

    if (response) {
      yield call(action.payload.callback, response.data, null);
      yield put(postActions.editPostSuccess({ postId, editedPost: response.data }));
    }
  } catch (error) {
    yield call(action.payload.callback, null, error);
    yield put(postActions.editPostFailed('Update a post failed'));
  }
}

function* handleDeletePost(action: PayloadAction<number>) {
  try {
    const response: { status: number } = yield call(postApi.deletePostRequest, action.payload);
    if (response.status === 200) {
      yield put(postActions.deletePostSuccess(action.payload));
    }
  } catch (error) {
    yield put(postActions.deletePostFailed('Delete a post failed'));
  }
}

function* handleApprovePendingPost(action: PayloadAction<{ postId: number; pending: boolean }>) {
  const { postId, pending } = action.payload;

  try {
    const response: { data: Post } = yield call(postApi.editPostRequest, postId, { pending });

    if (response) {
      yield put(postActions.approvePendingPostSuccess({ postId, editedPost: response.data }));
    }
  } catch (error) {
    yield put(postActions.approvePendingPostFailed('Update a post failed'));
  }
}

function* handleLikePost(action: PayloadAction<{ postId: number; currentUser: User }>) {
  try {
    const response: { data: PostLike } = yield call(
      postApi.likePostRequest,
      action.payload.postId,
      action.payload.currentUser
    );

    if (response) {
      yield put(postActions.likePostSuccess(response.data));
    }
  } catch (error) {
    yield put(postActions.likePostFailed('Like a post failed'));
  }
}

function* handleUnlikePost(action: PayloadAction<number>) {
  try {
    const response: { status: number } = yield call(postApi.unlikePostRequest, action.payload);

    if (response.status === 200) {
      yield put(postActions.unlikePostSuccess(action.payload));
    }
  } catch (error) {
    yield put(postActions.unlikePostFailed('Unlike a post failed'));
  }
}

function* handleAddComment(
  action: PayloadAction<{
    postId: number;
    currentUser: User;
    content: string;
  }>
) {
  const { postId, currentUser, content } = action.payload;
  try {
    const response: { data: PostComment } = yield call(
      postApi.addCommentRequest,
      postId,
      currentUser,
      content
    );

    if (response) {
      yield put(postActions.addCommentSuccess(response.data));
    }
  } catch (error) {
    yield put(postActions.addCommentFailed('Add a new comment failed'));
  }
}

function* handleEditComment(action: PayloadAction<{ commentId: number; newContent: string }>) {
  const { commentId, newContent } = action.payload;
  try {
    const response: { data: PostComment } = yield call(
      postApi.editCommentRequest,
      commentId,
      newContent
    );

    if (response) {
      yield put(postActions.editCommentSuccess(response.data));
    }
  } catch (error) {
    yield put(postActions.editCommentFailed('Update a comment failed'));
  }
}

function* handleDeleteComment(action: PayloadAction<number>) {
  try {
    const response: { status: number } = yield call(postApi.deleteCommentRequest, action.payload);
    if (response.status === 200) {
      yield put(postActions.deleteCommentSuccess(action.payload));
    }
  } catch (error) {
    yield put(postActions.deleteCommentFailed('Delete a comment failed'));
  }
}

function* watchPostManagementFlow() {
  yield takeLatest(postActions.fetchData.type, handleFetchData);

  yield takeLatest(postActions.addPost.type, handleAddPost);

  yield takeLatest(postActions.editPost.type, handleEditPost);

  yield takeLatest(postActions.deletePost.type, handleDeletePost);

  yield takeLatest(postActions.approvePendingPost.type, handleApprovePendingPost);

  yield takeLatest(postActions.likePost.type, handleLikePost);

  yield takeLatest(postActions.unlikePost.type, handleUnlikePost);

  yield takeLatest(postActions.addComment.type, handleAddComment);

  yield takeLatest(postActions.editComment.type, handleEditComment);

  yield takeLatest(postActions.deleteComment.type, handleDeleteComment);
}

export default function* postSaga() {
  yield fork(watchPostManagementFlow);
}
