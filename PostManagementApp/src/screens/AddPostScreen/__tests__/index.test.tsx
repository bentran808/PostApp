import React from 'react';
import AddPostScreen from '..';
import { render } from '../../../utils/test-utils';
import { mockPost } from '../../../__mocks__/data';

describe('Test Add Post Screen', () => {
  const route = {
    params: {
      editedPost: mockPost
    }
  };
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
  });

  test('should render correctly', () => {
    const { toJSON } = render(<AddPostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
