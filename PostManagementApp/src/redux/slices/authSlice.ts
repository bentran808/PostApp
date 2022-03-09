import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isLoggedIn: Boolean;
    logging?: Boolean;
    currentUser?: User;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, _action: PayloadAction<String>) {
            state.logging = true;
        },
        loginSuccess(state, _action: PayloadAction<User>) {
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = _action.payload;
        },
        loginFailed(state, _action: PayloadAction<String>) {
            state.logging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    }
});

// Actions
const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;

export { authActions, authReducer };
