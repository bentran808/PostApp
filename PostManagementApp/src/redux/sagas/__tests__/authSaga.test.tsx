import { call, put } from 'redux-saga/effects';
import { authApi } from '../../../api';
import { setAccessToken } from '../../../utils/helpers';
import { mockUser } from '../../../__mocks__/data';
import { authActions } from '../../slices';
import { handleLogin } from '../authSaga';

describe('Test Auth Saga', () => {
  test('should handle login success', () => {
    const payload = {
      params: 'email=admin@admin.com&password=admin',
      callback: (_data: User | null, _error: any) => {}
    };
    const generator = handleLogin(authActions.login(payload));
    const response = { data: { access_token: 'token', data: mockUser } };

    expect(generator.next().value).toEqual(call(authApi.loginRequest, payload.params));
    expect(generator.next(response).value).toEqual(call(payload.callback, mockUser, null));
    expect(generator.next(response).value).toEqual(
      call(setAccessToken, response.data.access_token)
    );
    expect(generator.next(response).value).toEqual(put(authActions.loginSuccess(response.data)));
  });

  test('should handle login failed', () => {
    const payload = {
      params: 'email=admin@admin.com&password=admin',
      callback: (_data: User | null, _error: any) => {}
    };
    const generator = handleLogin(authActions.login(payload));

    expect(generator.next().value).toEqual(call(authApi.loginRequest, payload.params));
    expect(generator.throw('error').value).toEqual(call(payload.callback, null, 'error'));
    expect(generator.next().value).toEqual(put(authActions.loginFailed('Login Failed')));
  });
});
