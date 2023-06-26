import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    authenticatedUser: string | null;
}

const initialState: AuthState = {
    authenticatedUser: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticatedUser: (state, action) => {
            state.authenticatedUser = action.payload;
        },
        clearAuthenticatedUser: (state) => {
            state.authenticatedUser = null;
        },
    },
});

export const { setAuthenticatedUser, clearAuthenticatedUser } = authSlice.actions;

export default authSlice.reducer;
