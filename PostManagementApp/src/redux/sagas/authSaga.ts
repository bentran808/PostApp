import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { authApi } from '../../api';
import { removeAccessToken, setAccessToken } from '../../utils/helpers';
import { authActions } from '../slices';

export function* handleLogin(
  action: PayloadAction<{ params: string; callback: (data: User | null, error: any) => void }>
) {
  try {
    const response: { data: { access_token: string; data: User } } = yield call(
      authApi.loginRequest,
      action.payload.params
    );

    if (response) {
      yield call(action.payload.callback, response.data.data, null);
      yield call(setAccessToken, response.data.access_token);
      yield put(authActions.loginSuccess(response.data));
    }
  } catch (error) {
    yield call(action.payload.callback, null, error);
    yield put(authActions.loginFailed('Login Failed'));
  }
}

function* handleLogout() {
  yield call(removeAccessToken);
}

function* watchLoginFlow() {
  yield takeLatest(authActions.login.type, handleLogin);

  yield takeLatest(authActions.logout.type, handleLogout);
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
