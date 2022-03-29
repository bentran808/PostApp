import React from 'react';
import ProfileScreen from '..';
import { render } from 'utils/test-utils';
import { mockPhotos } from '__mocks__/data';

describe('Test Show Image Screen', () => {
  const route = {
    params: {
      photos: mockPhotos
    }
  };

  test('should render correctly', () => {
    const { toJSON } = render(<ProfileScreen route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
