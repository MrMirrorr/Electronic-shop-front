import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthMe, fetchLogin, fetchLogout, fetchRegister } from '../actions';

const initialState = {
	user: null,
	isLoading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetServerError(state) {
			state.error = initialState.error;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLogin.pending, (state) => {
				state.user = initialState.user;
				state.isLoading = true;
				state.error = initialState.error;
			})
			.addCase(fetchLogin.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isLoading = false;
				state.error = initialState.error;
			})
			.addCase(fetchLogin.rejected, (state, action) => {
				state.user = initialState.user;
				state.isLoading = false;
				state.error = action.payload.error;
			})
			.addCase(fetchLogout.pending, (state) => {
				state.isLoading = true;
				state.error = initialState.error;
			})
			.addCase(fetchLogout.fulfilled, (state) => {
				state.user = initialState.user;
				state.isLoading = false;
				state.error = initialState.error;
			})
			.addCase(fetchLogout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload.error;
			})
			.addCase(fetchAuthMe.pending, (state) => {
				state.user = initialState.user;
				state.isLoading = true;
				state.error = initialState.error;
			})
			.addCase(fetchAuthMe.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isLoading = false;
				state.error = initialState.error;
			})
			.addCase(fetchAuthMe.rejected, (state) => {
				state.user = initialState.user;
				state.isLoading = false;
			})
			.addCase(fetchRegister.pending, (state) => {
				state.user = initialState.user;
				state.isLoading = true;
				state.error = initialState.error;
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isLoading = false;
				state.error = initialState.error;
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.user = initialState.user;
				state.isLoading = false;
				state.error = action.payload.error;
			});
	},
});

export const { logout, resetServerError } = authSlice.actions;
export const authReducer = authSlice.reducer;
