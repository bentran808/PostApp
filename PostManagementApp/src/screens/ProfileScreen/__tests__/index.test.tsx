import React from 'react';
import ProfileScreen from '..';
import { render } from '../../../utils/test-utils';

describe('Test Profile Screen', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
  });

  test('should render correctly', () => {
    const { toJSON } = render(<ProfileScreen navigation={navigation} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
