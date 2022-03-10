import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: Boolean;
    logging?: Boolean;
    currentUser?: User;
    accessToken: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
    accessToken: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, _action: PayloadAction<String>) {
            state.logging = true;
        },
        loginSuccess(state, _action: PayloadAction<{ data: User; access_token: string }>) {
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = _action.payload.data;
            state.accessToken = _action.payload.access_token;
        },
        loginFailed(state, _action: PayloadAction<String>) {
            state.logging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
            state.accessToken = '';
        }
    }
});

// Actions
const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;

export { authActions, authReducer };
