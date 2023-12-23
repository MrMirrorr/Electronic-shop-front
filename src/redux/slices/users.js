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
	reducers: {
		resetUsers(state) {
			state.users = [];
			state.roles = [];
			state.isLoading = true;
			state.error = null;
			state.deletionIsLoading = false;
			state.deletionError = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// fetch users
			.addCase(fetchUsers.pending, (state) => {
				state.users = [];
				state.roles = [];
				state.isLoading = true;
				state.error = null;
				state.deletionIsLoading = false;
				state.deletionError = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.error = null;
				state.users = action.payload.users;
				state.roles = action.payload.roles;
				state.isLoading = false;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.users = [];
				state.roles = [];
				state.isLoading = false;
				state.error = action.payload.error;
			})

			// remove user
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

export const { resetUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
