import {
  initialUser,
  mockApprovedPost,
  mockCommentsList,
  mockEditedPost,
  mockLike,
  mockLikes,
  mockNewComment,
  mockNewPost,
  mockPost,
  mockAdmin
} from '../../../__mocks__/data';
import { store } from '../../store';
import { postActions, selectComments, selectLikes, selectPosts } from '../postSlices';

const state = {
  auth: {
    isLoggedIn: false,
    logging: false,
    currentUser: initialUser,
    accessToken: '',
    errorMessage: ''
  },
  post: {
    loading: false,
    postsById: [2],
    posts: {
      2: mockPost
    },
    likes: [],
    comments: [],
    errorMessage: ''
  }
};

describe('Test Post Slice', () => {
  test('should call function fetchData', () => {
    store.dispatch(postActions.fetchData(() => {}));
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function fetchDataSuccess', () => {
    store.dispatch(
      postActions.fetchDataSuccess({
        postsById: [2],
        posts: {
          2: mockPost
        },
        likes: mockLikes,
        comments: mockCommentsList
      })
    );
    let postsById = store.getState().post.postsById;
    expect(postsById).toEqual([2]);
  });

  test('should call function fetchDataFailed', () => {
    store.dispatch(postActions.fetchDataFailed('Fetch data failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Fetch data failed');
  });

  test('should call function addPost', () => {
    store.dispatch(
      postActions.addPost({
        params: mockNewPost,
        callback: () => {}
      })
    );
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function addPostSuccess', () => {
    store.dispatch(postActions.addPostSuccess({ postId: 3, newPost: { ...mockNewPost, id: 3 } }));
    let postsById = store.getState().post.postsById;
    expect(postsById).toEqual([3, 2]);
  });

  test('should call function addPostFailed', () => {
    store.dispatch(postActions.addPostFailed('Add failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Add failed');
  });

  test('should call function editPost', () => {
    store.dispatch(
      postActions.editPost({
        postId: 3,
        editedPost: { ...mockNewPost, id: 3 },
        callback: () => {}
      })
    );
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function editPostSuccess', () => {
    store.dispatch(
      postActions.editPostSuccess({ postId: 3, editedPost: { ...mockNewPost, id: 3 } })
    );
    let posts = store.getState().post.posts;
    expect(posts).toEqual(mockEditedPost);
  });

  test('should call function editPostFailed', () => {
    store.dispatch(postActions.editPostFailed('Edit failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Edit failed');
  });

  test('should call function deletePost', () => {
    store.dispatch(postActions.deletePost(3));
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function deletePostSuccess', () => {
    store.dispatch(postActions.deletePostSuccess(3));
    let postsById = store.getState().post.postsById;
    expect(postsById).toEqual([2]);
  });

  test('should call function deletePostFailed', () => {
    store.dispatch(postActions.deletePostFailed('Delete failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Delete failed');
  });

  test('should call function approvePendingPost', () => {
    store.dispatch(
      postActions.approvePendingPost({
        postId: 3,
        pending: false
      })
    );
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function approvePendingPostSuccess', () => {
    store.dispatch(
      postActions.approvePendingPostSuccess({
        postId: 3,
        editedPost: { ...mockNewPost, id: 3, pending: false }
      })
    );
    let posts = store.getState().post.posts;
    expect(posts).toEqual(mockApprovedPost);
  });

  test('should call function approvePendingPostFailed', () => {
    store.dispatch(postActions.approvePendingPostFailed('Approved failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Approved failed');
  });

  test('should call function likePost', () => {
    store.dispatch(
      postActions.likePost({
        postId: 2,
        currentUser: mockAdmin
      })
    );
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function likePostSuccess', () => {
    store.dispatch(postActions.likePostSuccess(mockLike));
    let likes = store.getState().post.likes;
    expect(likes).toEqual([...mockLikes, mockLike]);
  });

  test('should call function likePostFailed', () => {
    store.dispatch(postActions.likePostFailed('Like failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Like failed');
  });

  test('should call function unlikePost', () => {
    store.dispatch(postActions.unlikePost(2));
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function unlikePostSuccess', () => {
    store.dispatch(postActions.unlikePostSuccess(2));
    let likes = store.getState().post.likes;
    expect(likes).toEqual(mockLikes);
  });

  test('should call function unlikePostFailed', () => {
    store.dispatch(postActions.unlikePostFailed('Unlike failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Unlike failed');
  });

  test('should call function addComment', () => {
    store.dispatch(
      postActions.addComment({
        postId: 2,
        currentUser: mockAdmin,
        content: 'test'
      })
    );
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function addCommentSuccess', () => {
    store.dispatch(postActions.addCommentSuccess(mockNewComment));
    let comments = store.getState().post.comments;
    expect(comments).toEqual([...mockCommentsList, mockNewComment]);
  });

  test('should call function addCommentFailed', () => {
    store.dispatch(postActions.addCommentFailed('Add comment failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Add comment failed');
  });

  test('should call function editComment', () => {
    store.dispatch(
      postActions.editComment({
        commentId: 3,
        newContent: 'asd'
      })
    );
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function editCommentSuccess', () => {
    const editedComment = { ...mockNewComment, content: 'asd' };
    store.dispatch(postActions.editCommentSuccess(editedComment));
    let comments = store.getState().post.comments;
    expect(comments).toEqual([...mockCommentsList, editedComment]);
  });

  test('should call function editCommentFailed', () => {
    store.dispatch(postActions.editCommentFailed('Edit comment failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Edit comment failed');
  });

  test('should call function deleteComment', () => {
    store.dispatch(postActions.deleteComment(3));
    let loading = store.getState().post.loading;
    expect(loading).toBeTruthy();
  });

  test('should call function deleteCommentSuccess', () => {
    store.dispatch(postActions.deleteCommentSuccess(3));
    let comments = store.getState().post.comments;
    expect(comments).toEqual(mockCommentsList);
  });

  test('should call function deleteCommentFailed', () => {
    store.dispatch(postActions.deleteCommentFailed('Delete comment failed'));
    let errorMessage = store.getState().post.errorMessage;
    expect(errorMessage).toBe('Delete comment failed');
  });

  test('should call function selectPosts', () => {
    expect(selectPosts(state)).toEqual([mockPost]);
  });

  test('should call function selectLikes', () => {
    expect(selectLikes(state)).toEqual([]);
  });

  test('should call function selectComments', () => {
    expect(selectComments(state)).toEqual([]);
  });
});
