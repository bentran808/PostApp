import React from 'react';
import * as customHooks from '../../../hooks';
import { fireEvent, render } from '../../../utils/test-utils';
import { mockAdmin, mockCommentsList } from '../../../__mocks__/data';
import CommentsList from '../index';

describe('Comments List Component', () => {
  const spy = jest.spyOn(customHooks, 'useAppSelector');
  spy.mockReturnValue(mockAdmin);

  const props = {
    commentsOfItem: mockCommentsList,
    visible: 'comment-1',
    editComment: 'comment-1',
    editContent: 'test',
    setVisible: jest.fn(),
    setEditComment: jest.fn(),
    onSetEditContent: jest.fn(),
    onDeleteComment: jest.fn(),
    onEditComment: jest.fn()
  };

  test('renders correctly', () => {
    const { getAllByTestId, toJSON } = render(<CommentsList {...props} />);
    const menu = getAllByTestId('MenuOfComment');
    fireEvent.press(menu[0]);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should clear edit comment', () => {
    const { getByTestId } = render(<CommentsList {...props} />);
    const button = getByTestId('clearEditComment');
    fireEvent.press(button);
    expect(props.onSetEditContent).toBeCalledWith('');
  });

  test('should edit comment', () => {
    const { getByPlaceholderText } = render(<CommentsList {...props} />);
    const input = getByPlaceholderText('Write a comment');
    fireEvent.changeText(input, 'asd');
    expect(props.onSetEditContent).toBeCalledWith('asd');
  });

  test('should cancel edit comment', () => {
    const { getByTestId } = render(<CommentsList {...props} />);
    const button = getByTestId('buttonCancel');
    fireEvent.press(button);
    expect(props.onSetEditContent).toBeCalledWith('');
  });

  test('should save edit comment', () => {
    const { getByTestId } = render(<CommentsList {...props} />);
    const button = getByTestId('buttonSave');
    fireEvent.press(button);
    expect(props.onEditComment).toBeCalledWith(1, 'test');
  });
});
