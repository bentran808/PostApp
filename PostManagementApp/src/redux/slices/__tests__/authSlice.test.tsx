import { mockAdmin } from '../../../__mocks__/data';
import { store } from '../../store';
import { authActions, selectCurrentUser } from '../authSlice';

describe('Test Auth Slice', () => {
  test('should call function login', () => {
    store.dispatch(
      authActions.login({
        params: 'email=admin@admin.com&password=admin',
        callback: () => {}
      })
    );
    let logging = store.getState().auth.logging;
    expect(logging).toBeTruthy();
  });

  test('should call function login success', () => {
    store.dispatch(
      authActions.loginSuccess({
        data: mockAdmin,
        access_token: 'token'
      })
    );
    let accessToken = store.getState().auth.accessToken;
    expect(accessToken).toBe('token');
  });

  test('should call function login failed', () => {
    store.dispatch(authActions.loginFailed('Login Failed'));
    let errorMessage = store.getState().auth.errorMessage;
    expect(errorMessage).toBe('Login Failed');
  });

  test('should call function logout', () => {
    store.dispatch(authActions.logout());
    let accessToken = store.getState().auth.accessToken;
    expect(accessToken).toBe('');
  });

  test('should call function selectCurrentUser', () => {
    const state = {
      auth: {
        isLoggedIn: false,
        logging: false,
        currentUser: mockAdmin,
        accessToken: '',
        errorMessage: ''
      },
      post: {
        loading: false,
        postsById: [],
        posts: {},
        likes: [],
        comments: [],
        errorMessage: ''
      }
    };
    expect(selectCurrentUser(state)).toEqual(mockAdmin);
  });
});
