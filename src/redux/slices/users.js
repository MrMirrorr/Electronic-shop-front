import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, removeUserAsync } from '../actions';

const initialState = {
	users: [],
	roles: [],
	isLoading: true,
	error: null,
	deletionIsLoading: false,
	deletionError: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, () => initialState)
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.error = initialState.error;
				state.users = action.payload.users;
				state.roles = action.payload.roles;
				state.lastPage = action.payload.lastPage;
				state.isLoading = false;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.users = initialState.users;
				state.roles = initialState.roles;
				state.lastPage = initialState.lastPage;
				state.isLoading = false;
				state.error = action.payload.error;
			})
			.addCase(removeUserAsync.pending, (state) => {
				state.deletionIsLoading = true;
				state.deletionError = null;
			})
			.addCase(removeUserAsync.fulfilled, (state, action) => {
				state.users = state.users.filter((user) => user.id !== action.payload.id);
				state.deletionIsLoading = false;
				state.deletionError = null;
			})
			.addCase(removeUserAsync.rejected, (state, action) => {
				state.deletionIsLoading = false;
				state.deletionError = action.payload.error;
			});
	},
});

export const usersReducer = usersSlice.reducer;
