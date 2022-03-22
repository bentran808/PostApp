import { store } from '../../store';
import {
  initialUser,
  mockCommentsList,
  mockLikes,
  mockPost,
  mockUser
} from '../../../__mocks__/data';
import { postActions, selectComments, selectLikes, selectPosts } from '../postSlices';

const mockNewPost = {
  author: mockUser,
  company: 'qwe',
  year: 2021,
  type: 'qwe',
  status: true,
  price: 10000,
  address: 'qwe',
  title: 'qwe',
  description: 'qwe',
  photos: [],
  pending: true
};

const mockEditedPost = {
  '2': mockPost,
  '3': {
    id: 3,
    ...mockNewPost
  }
};

const mockApprovedPost = {
  '2': mockPost,
  '3': {
    id: 3,
    ...mockNewPost,
    pending: false
  }
};

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
