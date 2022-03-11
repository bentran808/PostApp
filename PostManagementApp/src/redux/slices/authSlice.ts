import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
    isLoggedIn: Boolean;
    logging?: Boolean;
    currentUser: User;
    accessToken: string | null;
    errorMessage: string;
}

const initialUser = {
    id: '',
    avatar: '',
    name: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    role: ''
};

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: initialUser,
    accessToken: '',
    errorMessage: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, _action: PayloadAction<string>) {
            state.logging = true;
            state.errorMessage = '';
        },
        loginSuccess(state, _action: PayloadAction<{ data: User; access_token: string }>) {
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = _action.payload.data;
            state.accessToken = _action.payload.access_token;
        },
        loginFailed(state, _action: PayloadAction<string>) {
            state.logging = false;
            state.errorMessage = _action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = initialUser;
            state.accessToken = '';
        }
    }
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

// Reducer
const authReducer = authSlice.reducer;

export default authReducer;
