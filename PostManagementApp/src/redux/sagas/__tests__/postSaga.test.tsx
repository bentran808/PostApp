import { postApi } from '../../../api';
import { all, call, put } from 'redux-saga/effects';
import { postActions } from '../../slices';
import {
  handleAddComment,
  handleAddPost,
  handleApprovePendingPost,
  handleDeleteComment,
  handleDeletePost,
  handleEditComment,
  handleEditPost,
  handleFetchData,
  handleLikePost,
  handleUnlikePost
} from '../postSaga';
import { mockLike, mockNewComment, mockNewPost, mockPost, mockAdmin } from '../../../__mocks__/data';

describe('Test Post Saga', () => {
  test('should handle fetch data success', () => {
    const payload = () => {};
    const generator = handleFetchData(postActions.fetchData(payload));
    const response: [{ data: Post[] }, { data: PostLike[] }, { data: PostComment[] }] = [
      { data: [mockPost] },
      { data: [] },
      { data: [] }
    ];

    expect(generator.next().value).toEqual(
      all([
        postApi.fetchPostsRequest(),
        postApi.fetchLikesRequest(),
        postApi.fetchCommentsRequest()
      ])
    );
    expect(generator.next(response).value).toEqual(
      put(
        postActions.fetchDataSuccess({
          postsById: [2],
          posts: { '2': mockPost },
          likes: [],
          comments: []
        })
      )
    );
  });

  test('should handle fetch data failed', () => {
    const payload = () => {};
    const generator = handleFetchData(postActions.fetchData(payload));
    expect(generator.next().value).toEqual(
      all([
        postApi.fetchPostsRequest(),
        postApi.fetchLikesRequest(),
        postApi.fetchCommentsRequest()
      ])
    );
    expect(generator.throw('error').value).toEqual(
      put(postActions.fetchDataFailed('Fetch data failed'))
    );
  });

  test('should handle add post success', () => {
    const payload = {
      params: mockNewPost,
      callback: (_data: Post | null, _error: any) => {}
    };
    const generator = handleAddPost(postActions.addPost(payload));
    const response = {
      data: { ...mockNewPost, createdAt: 1647507076963, updatedAt: 1647507076963, id: 2 }
    };
    expect(generator.next().value).toEqual(call(postApi.addPostRequest, payload.params));
    expect(generator.next(response).value).toEqual(call(payload.callback, response.data, null));
    expect(generator.next(response).value).toEqual(
      put(postActions.addPostSuccess({ postId: 2, newPost: response.data }))
    );
  });

  test('should handle add post failed', () => {
    const payload = {
      params: mockNewPost,
      callback: (_data: Post | null, _error: any) => {}
    };
    const generator = handleAddPost(postActions.addPost(payload));
    expect(generator.next().value).toEqual(call(postApi.addPostRequest, payload.params));
    expect(generator.throw('error').value).toEqual(call(payload.callback, null, 'error'));
    expect(generator.next().value).toEqual(put(postActions.addPostFailed('Add a new post failed')));
  });

  test('should handle edit post success', () => {
    const payload = {
      postId: 2,
      editedPost: mockNewPost,
      callback: (_data: Post | null, _error: any) => {}
    };
    const generator = handleEditPost(postActions.editPost(payload));
    const response = {
      data: { ...mockNewPost, createdAt: 1647507076963, updatedAt: 1647511146749, id: 2 }
    };
    expect(generator.next().value).toEqual(
      call(postApi.editPostRequest, payload.postId, payload.editedPost)
    );
    expect(generator.next(response).value).toEqual(call(payload.callback, response.data, null));
    expect(generator.next(response).value).toEqual(
      put(postActions.editPostSuccess({ postId: 2, editedPost: response.data }))
    );
  });

  test('should handle edit post failed', () => {
    const payload = {
      postId: 2,
      editedPost: mockNewPost,
      callback: (_data: Post | null, _error: any) => {}
    };
    const generator = handleEditPost(postActions.editPost(payload));
    expect(generator.next().value).toEqual(
      call(postApi.editPostRequest, payload.postId, payload.editedPost)
    );
    expect(generator.throw('error').value).toEqual(call(payload.callback, null, 'error'));
    expect(generator.next().value).toEqual(put(postActions.editPostFailed('Update a post failed')));
  });

  test('should handle delete post success', () => {
    const generator = handleDeletePost(postActions.deletePost(2));
    const response = {
      status: 200
    };
    expect(generator.next().value).toEqual(call(postApi.deletePostRequest, 2));
    expect(generator.next(response).value).toEqual(put(postActions.deletePostSuccess(2)));
  });

  test('should handle delete post failed', () => {
    const generator = handleDeletePost(postActions.deletePost(2));
    expect(generator.next().value).toEqual(call(postApi.deletePostRequest, 2));
    expect(generator.throw('error').value).toEqual(
      put(postActions.deletePostFailed('Delete a post failed'))
    );
  });

  test('should handle approve pending post success', () => {
    const generator = handleApprovePendingPost(
      postActions.approvePendingPost({ postId: 2, pending: false })
    );
    const response = {
      data: {
        ...mockNewPost,
        createdAt: 1647507076963,
        updatedAt: 1647511146749,
        id: 2,
        pending: false
      }
    };
    expect(generator.next().value).toEqual(call(postApi.editPostRequest, 2, { pending: false }));
    expect(generator.next(response).value).toEqual(
      put(
        postActions.approvePendingPostSuccess({
          postId: 2,
          editedPost: response.data
        })
      )
    );
  });

  test('should handle approve pending post failed', () => {
    const generator = handleApprovePendingPost(
      postActions.approvePendingPost({ postId: 2, pending: false })
    );
    expect(generator.next().value).toEqual(call(postApi.editPostRequest, 2, { pending: false }));
    expect(generator.throw('error').value).toEqual(
      put(postActions.approvePendingPostFailed('Update a post failed'))
    );
  });

  test('should handle like post success', () => {
    const generator = handleLikePost(postActions.likePost({ postId: 2, currentUser: mockAdmin }));
    const response = {
      data: mockLike
    };
    expect(generator.next().value).toEqual(call(postApi.likePostRequest, 2, mockAdmin));
    expect(generator.next(response).value).toEqual(put(postActions.likePostSuccess(response.data)));
  });

  test('should handle like post failed', () => {
    const generator = handleLikePost(postActions.likePost({ postId: 2, currentUser: mockAdmin }));
    expect(generator.next().value).toEqual(call(postApi.likePostRequest, 2, mockAdmin));
    expect(generator.throw('error').value).toEqual(
      put(postActions.likePostFailed('Like a post failed'))
    );
  });

  test('should handle unlike post success', () => {
    const generator = handleUnlikePost(postActions.unlikePost(2));
    const response = {
      status: 200
    };
    expect(generator.next().value).toEqual(call(postApi.unlikePostRequest, 2));
    expect(generator.next(response).value).toEqual(put(postActions.unlikePostSuccess(2)));
  });

  test('should handle unlike post failed', () => {
    const generator = handleUnlikePost(postActions.unlikePost(2));
    expect(generator.next().value).toEqual(call(postApi.unlikePostRequest, 2));
    expect(generator.throw('error').value).toEqual(
      put(postActions.unlikePostFailed('Unlike a post failed'))
    );
  });

  test('should handle add comment success', () => {
    const payload = {
      postId: 2,
      currentUser: mockAdmin,
      content: 'test'
    };
    const generator = handleAddComment(postActions.addComment(payload));
    const response = {
      data: mockNewComment
    };
    expect(generator.next().value).toEqual(
      call(postApi.addCommentRequest, payload.postId, payload.currentUser, payload.content)
    );
    expect(generator.next(response).value).toEqual(
      put(postActions.addCommentSuccess(response.data))
    );
  });

  test('should handle add comment failed', () => {
    const payload = {
      postId: 2,
      currentUser: mockAdmin,
      content: 'test'
    };
    const generator = handleAddComment(postActions.addComment(payload));
    expect(generator.next().value).toEqual(
      call(postApi.addCommentRequest, payload.postId, payload.currentUser, payload.content)
    );
    expect(generator.throw('error').value).toEqual(
      put(postActions.addCommentFailed('Add a new comment failed'))
    );
  });

  test('should handle edit comment success', () => {
    const payload = {
      commentId: 3,
      newContent: 'test'
    };
    const generator = handleEditComment(postActions.editComment(payload));
    const response = {
      data: mockNewComment
    };
    expect(generator.next().value).toEqual(
      call(postApi.editCommentRequest, payload.commentId, payload.newContent)
    );
    expect(generator.next(response).value).toEqual(
      put(postActions.editCommentSuccess(response.data))
    );
  });

  test('should handle edit comment failed', () => {
    const payload = {
      commentId: 3,
      newContent: 'test'
    };
    const generator = handleEditComment(postActions.editComment(payload));
    expect(generator.next().value).toEqual(
      call(postApi.editCommentRequest, payload.commentId, payload.newContent)
    );
    expect(generator.throw('error').value).toEqual(
      put(postActions.editCommentFailed('Update a comment failed'))
    );
  });

  test('should handle delete comment success', () => {
    const generator = handleDeleteComment(postActions.deleteComment(3));
    const response = {
      status: 200
    };
    expect(generator.next().value).toEqual(call(postApi.deleteCommentRequest, 3));
    expect(generator.next(response).value).toEqual(put(postActions.deleteCommentSuccess(3)));
  });

  test('should handle delete comment failed', () => {
    const generator = handleDeleteComment(postActions.deleteComment(3));
    expect(generator.next().value).toEqual(call(postApi.deleteCommentRequest, 3));
    expect(generator.throw('error').value).toEqual(
      put(postActions.deleteCommentFailed('Delete a comment failed'))
    );
  });
});
