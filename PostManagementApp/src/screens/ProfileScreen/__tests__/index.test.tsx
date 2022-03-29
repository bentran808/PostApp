import React from 'react';
import ProfileScreen from '..';
import { Screens } from 'constants/screens';
import * as customHooks from 'hooks';
import { fireEvent, render } from 'utils/test-utils';

describe('Test Profile Screen', () => {
  const dispatch = jest.fn();
  const spyDispatch = jest.spyOn(customHooks, 'useAppDispatch');
  spyDispatch.mockReturnValue(dispatch);
  let navigation: any;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
  });

  afterEach(() => {
    spyDispatch.mockClear();
    jest.clearAllMocks();
  });

  test('should render correctly', () => {
    const { toJSON } = render(<ProfileScreen navigation={navigation} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should call function handle logout', () => {
    const { getByText } = render(<ProfileScreen navigation={navigation} />);
    const button = getByText('Logout');
    fireEvent.press(button);
    expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: 'auth/logout' });
    expect(navigation.navigate).toHaveBeenCalledWith(Screens.LOGIN.name);
  });
});
