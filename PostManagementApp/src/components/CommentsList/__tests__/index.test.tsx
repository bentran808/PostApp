import React from 'react';
import CommentsList from '../index';

import { render } from '../../../utils/test-utils';

describe('Comments List Component', () => {
  it('renders correctly', () => {
    const props = {
      commentsOfItem: [],
      visible: '',
      editComment: '',
      editContent: '',
      setVisible: jest.fn(),
      setEditComment: jest.fn(),
      onSetEditContent: jest.fn(),
      onDeleteComment: jest.fn(),
      onEditComment: jest.fn()
    };

    const component = render(<CommentsList {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
