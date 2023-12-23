import { createSlice } from '@reduxjs/toolkit';
import {
	fetchAuthMe,
	fetchLogin,
	fetchLogout,
	fetchRegister,
	updateUserAsync,
} from '../actions';

const initialState = {
	user: null,
	isLoading: false,
	isAuthMeLoading: true,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetServerError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// login
			.addCase(fetchLogin.pending, (state) => {
				state.user = null;
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(fetchLogin.rejected, (state, action) => {
				state.user = null;
				state.isLoading = false;
				state.error = action.payload.error;
			})

			// logout
			.addCase(fetchLogout.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchLogout.fulfilled, (state) => {
				state.user = null;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(fetchLogout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload.error;
			})

			// auth me
			.addCase(fetchAuthMe.pending, (state) => {
				state.user = null;
				state.isAuthMeLoading = true;
				state.error = null;
			})
			.addCase(fetchAuthMe.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuthMeLoading = false;
				state.error = null;
			})
			.addCase(fetchAuthMe.rejected, (state) => {
				state.user = null;
				state.isAuthMeLoading = false;
			})

			// register
			.addCase(fetchRegister.pending, (state) => {
				state.user = null;
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.user = null;
				state.isLoading = false;
				state.error = action.payload.error;
			})

			// update user
			.addCase(updateUserAsync.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(updateUserAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload.error;
			});
	},
});

export const { logout, resetServerError } = authSlice.actions;
export const authReducer = authSlice.reducer;
