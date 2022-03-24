import React from 'react';
import MyPostScreen from '..';
import { render } from '../../../utils/test-utils';
import { mockPost } from '../../../__mocks__/data';

describe('Test My Post Screen', () => {
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

  test('should render correctly', () => {
    const { toJSON } = render(<MyPostScreen navigation={navigation} route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
