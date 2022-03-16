import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { authApi } from '../../api';
import { removeAccessToken, setAccessToken } from '../../utils/helpers';
import { authActions } from '../slices';

function* handleLogin(action: PayloadAction<string>) {
    try {
        const response: { data: { access_token: string; data: User } } = yield call(
            authApi.loginRequest,
            action.payload
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
    yield takeLatest(authActions.login.type, handleLogin);

    yield takeLatest(authActions.logout.type, handleLogout);
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
