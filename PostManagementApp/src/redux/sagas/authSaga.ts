import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import { authApi } from '../../api';
import { removeAccessToken, setAccessToken } from '../../utils/helpers';
import { authActions } from '../slices';

function* handleLogin(payload: string) {
    try {
        const response: { data: { access_token: string; data: User } } = yield call(
            authApi.loginRequest,
            payload
        );

        if (response) {
            yield call(setAccessToken, response.data.access_token);
            yield put(authActions.loginSuccess(response.data));
        }
    } catch (error) {
        if (error) {
            yield put(authActions.loginFailed('Login Failed'));
        }
    }
}

function* handleLogout() {
    yield call(removeAccessToken);
}

function* watchLoginFlow() {
    while (true) {
        const action: PayloadAction<string> = yield take(authActions.login.type);
        yield fork(handleLogin, action.payload);

        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
