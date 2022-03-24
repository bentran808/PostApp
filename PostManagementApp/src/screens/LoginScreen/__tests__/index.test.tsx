import React from 'react';
import LoginScreen from '..';
import * as customHooks from '../../../hooks';
import { fireEvent, render } from '../../../utils/test-utils';

jest.mock('../../../hooks');

describe('Test Login Screen', () => {
  const dispatch = jest.fn();
  const spy = jest.spyOn(customHooks, 'useAppDispatch');
  spy.mockReturnValue(dispatch);
  let navigation: any;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };
  });

  test('should render correctly', () => {
    const { toJSON } = render(<LoginScreen navigation={navigation} />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('should show email error message', () => {
    const { getByTestId } = render(<LoginScreen navigation={navigation} />);
    const input = getByTestId('emailInput');
    fireEvent.changeText(input, 'asd');
    const message = getByTestId('emailError');
    expect(message).toBeDefined();
    expect(message.children).toEqual(['email must be a valid email']);
  });

  test('should show password error message', () => {
    const { getByTestId } = render(<LoginScreen navigation={navigation} />);
    const input = getByTestId('passwordInput');
    fireEvent.changeText(input, '1');
    const message = getByTestId('passwordError');
    expect(message).toBeDefined();
    expect(message.children).toEqual(['password must be at least 5 characters']);
  });

  test('should change hidden icon', () => {
    const { getByTestId } = render(<LoginScreen navigation={navigation} />);
    const icon = getByTestId('icon');
    fireEvent.press(icon);
    expect(getByTestId('passwordInput').props.secureTextEntry).toBeFalsy();
  });

  test('should call function handleLogin', () => {
    const { getByTestId } = render(<LoginScreen navigation={navigation} />);
    const email = getByTestId('emailInput');
    fireEvent.changeText(email, 'admin@admin.com');
    const password = getByTestId('passwordInput');
    fireEvent.changeText(password, 'admin');
    const button = getByTestId('loginButton');
    fireEvent.press(button);

    expect(dispatch).toHaveBeenCalled();
  });
});
