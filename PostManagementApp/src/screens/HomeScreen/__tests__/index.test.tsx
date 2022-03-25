import React from 'react';
import HomeScreen from '..';
import { Screens } from '../../../constants/screens';
import * as customHooks from '../../../hooks';
import { RootState } from '../../../redux/store';
import { fireEvent, render, act } from '../../../utils/test-utils';
import {
  mockCommentsList,
  mockLikes,
  mockPhotos,
  mockPost,
  mockAdmin
} from '../../../__mocks__/data';

jest.mock('../../../hooks');

describe('Test Home Screen', () => {
  const dispatch = jest.fn();
  const spySelector = jest.spyOn(customHooks, 'useAppSelector');
  let spyDispatch: any;
  let navigation: any;
  let mockStore: RootState = {
    auth: {
      currentUser: mockAdmin,
      isLoggedIn: false,
      logging: false,
      accessToken: '',
      errorMessage: ''
    },
    post: {
      postsById: [2],
      posts: {
        '2': mockPost
      },
      likes: [],
      comments: mockCommentsList,
      loading: false,
      errorMessage: ''
    }
  };

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
    spyDispatch = jest.spyOn(customHooks, 'useAppDispatch');
    spyDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    spyDispatch.mockClear();
    spySelector.mockClear();
    jest.clearAllMocks();
  });

  test('should render correctly with empty list', () => {
    const { toJSON } = render(<HomeScreen navigation={navigation} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should render correctly', () => {
    spySelector.mockImplementation((selector) => selector(mockStore));
    const { toJSON, getAllByTestId } = render(<HomeScreen navigation={navigation} />);
    const menu = getAllByTestId('Menu');
    fireEvent.press(menu[0]);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should navigate to show image screen', () => {
    const { getByTestId } = render(<HomeScreen navigation={navigation} />);
    const button = getByTestId('showImage');
    fireEvent.press(button);
    expect(navigation.navigate).toHaveBeenCalledWith(Screens.SHOW_IMAGE_SCREEN.name, {
      photos: mockPhotos
    });
  });

  test('should call function handleLikePost', () => {
    const { getByTestId } = render(<HomeScreen navigation={navigation} />);
    const button = getByTestId('likeButton');
    fireEvent.press(button);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should call function handleUnlikePost', () => {
    mockStore.post.likes = mockLikes;
    spySelector.mockImplementation((selector) => selector(mockStore));
    const { getByTestId } = render(<HomeScreen navigation={navigation} />);
    const button = getByTestId('likeButton');
    fireEvent.press(button);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should call function handleAddComment', () => {
    const { getByTestId } = render(<HomeScreen navigation={navigation} />);
    const button = getByTestId('commentButton');
    fireEvent.press(button);

    const input = getByTestId('inputComment');
    fireEvent.changeText(input, 'test');

    const buttonSend = getByTestId('buttonAddComment');
    fireEvent.press(buttonSend);

    expect(dispatch).toHaveBeenCalled();
  });

  test('should call function handleRefresh', async () => {
    const { getByTestId } = render(<HomeScreen navigation={navigation} />);
    const list = getByTestId('postsList');
    await act(async () => {
      list.props.onRefresh();
    });
    expect(dispatch).toHaveBeenCalled();
  });
});
