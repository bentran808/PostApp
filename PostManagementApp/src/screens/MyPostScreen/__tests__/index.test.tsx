import React from 'react';
import MyPostScreen from '..';
import { Screens } from '../../../constants/screens';
import * as customHooks from '../../../hooks';
import type { RootState } from '../../../redux/store';
import { act, fireEvent, render } from '../../../utils/test-utils';
import { mockAdmin, mockPhotos, mockPost, mockUser } from '../../../__mocks__/data';

describe('Test My Post Screen', () => {
  const mockStore: RootState = {
    auth: {
      currentUser: mockUser,
      isLoggedIn: false,
      logging: false,
      accessToken: '',
      errorMessage: ''
    },
    post: {
      postsById: [],
      posts: {},
      likes: [],
      comments: [],
      loading: false,
      errorMessage: ''
    }
  };
  const dispatch = jest.fn();
  const spyDispatch = jest.spyOn(customHooks, 'useAppDispatch');
  spyDispatch.mockReturnValue(dispatch);
  const spySelector = jest.spyOn(customHooks, 'useAppSelector');
  spySelector.mockImplementation((selector) => selector(mockStore));
  const route = {
    params: {
      data: mockPost
    }
  };
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
  });

  afterEach(() => {
    spyDispatch.mockClear();
    spySelector.mockClear();
    jest.clearAllMocks();
  });

  test('should render correctly with empty list', () => {
    const { toJSON } = render(<MyPostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render correctly my posts', () => {
    mockStore.post.postsById = [2];
    mockStore.post.posts = {
      '2': { ...mockPost, id: 2, author: mockUser }
    };
    const { toJSON } = render(<MyPostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render correctly', () => {
    mockStore.auth.currentUser = mockAdmin;
    mockStore.post.postsById = [3, 2];
    mockStore.post.posts = {
      '3': { ...mockPost, id: 3, pending: true },
      '2': mockPost
    };
    const { toJSON } = render(<MyPostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should navigate to show image screen', () => {
    const { getAllByTestId } = render(<MyPostScreen navigation={navigation} route={route} />);
    const button = getAllByTestId('showImage');
    fireEvent.press(button[0]);
    expect(navigation.navigate).toHaveBeenCalledWith(Screens.SHOW_IMAGE_SCREEN.name, {
      photos: mockPhotos
    });
  });

  test('should call function handleApprovePost', () => {
    const { getAllByText } = render(<MyPostScreen navigation={navigation} route={route} />);
    const button = getAllByText('Approve');
    fireEvent.press(button[0]);
    expect(dispatch).toHaveBeenCalledWith({
      payload: { pending: false, postId: 3 },
      type: 'post/approvePendingPost'
    });
  });

  test('should call function handleRejectPost', () => {
    const { getAllByText } = render(<MyPostScreen navigation={navigation} route={route} />);
    const button = getAllByText('Reject');
    fireEvent.press(button[0]);
    expect(dispatch).toHaveBeenCalledWith({ payload: 3, type: 'post/deletePost' });
  });

  test('should call function handleRefresh', async () => {
    const { getByTestId } = render(<MyPostScreen navigation={navigation} route={route} />);
    const list = getByTestId('postsList');
    await act(async () => {
      list.props.onRefresh();
    });
    expect(dispatch).toHaveBeenCalled();
  });
});
