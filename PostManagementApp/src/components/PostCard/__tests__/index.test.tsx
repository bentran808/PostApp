import React from 'react';
import * as customHooks from '../../../hooks';
import { fireEvent, render, RenderAPI } from '../../../utils/test-utils';
import { mockCommentsList, mockLikes, mockPost, mockUser } from '../../../__mocks__/data';
import PostCard from '../index';

describe('Post Card Component', () => {
  const spy = jest.spyOn(customHooks, 'useAppSelector');
  spy.mockReturnValue(mockUser);

  let props: JSX.IntrinsicAttributes & {
    item: Post;
    isMyPost?: Boolean | undefined;
    likesOfItem?: PostLike[] | undefined;
    commentsOfItem?: PostComment[] | undefined;
    onShowImage: (photos: Photo[]) => void;
    onEdit: () => void;
    onDelete: () => void;
    onLikePost?: ((postId: number) => void) | undefined;
    onUnlikePost?: ((likeId: number) => void) | undefined;
    onAddNewComment?: ((postId: number, content: string) => void) | undefined;
    onDeleteComment?: ((commentId: number) => void) | undefined;
    onEditComment?: ((commentId: number, editContent: string) => void) | undefined;
    onApprovePost?: (() => void) | undefined;
    onRejectPost?: (() => void) | undefined;
  };
  let component: RenderAPI;

  beforeAll(() => {
    props = {
      item: mockPost,
      likesOfItem: mockLikes,
      commentsOfItem: mockCommentsList,
      onShowImage: jest.fn(),
      onEdit: jest.fn(),
      onDelete: jest.fn(),
      onLikePost: jest.fn(),
      onUnlikePost: jest.fn()
    };

    component = render(<PostCard {...props} />);
  });

  test('renders correctly', () => {
    const menu = component.getAllByTestId('Menu');
    fireEvent.press(menu[0]);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should show image with data', () => {
    const { getByTestId } = render(<PostCard {...props} />);
    const button = getByTestId('showImage');
    fireEvent.press(button);
    expect(props.onShowImage).toBeCalledWith([
      {
        fileName: 'rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
        fileSize: 6689,
        height: 480,
        type: 'image/jpeg',
        uri: 'file:///data/user/0/com.PostManagementApp/cache/rn_image_picker_lib_temp_283c7c3b-b014-4ef4-b95a-c092bcefe2aa.jpg',
        width: 480
      }
    ]);
  });

  test('should details post', () => {
    const { getByTestId } = render(<PostCard {...props} />);
    const button = getByTestId('showDetails');
    fireEvent.press(button);
    expect(getByTestId('contentDetails')).toBeDefined();
  });

  test('should call like button', () => {
    const { getByTestId } = render(<PostCard {...props} />);
    const button = getByTestId('likeButton');
    fireEvent.press(button);
    expect(props.onUnlikePost).toBeCalledWith(1);
  });

  test('should call comment button', () => {
    const { getByTestId } = render(<PostCard {...props} />);
    const button = getByTestId('commentButton');
    fireEvent.press(button);

    const input = getByTestId('inputComment');
    fireEvent.changeText(input, 'test');

    const buttonSend = getByTestId('buttonAddComment');
    fireEvent.press(buttonSend);

    expect(getByTestId('commentWrapper')).toBeDefined();
    expect(getByTestId('commentList')).not.toBeNull();
  });
});
