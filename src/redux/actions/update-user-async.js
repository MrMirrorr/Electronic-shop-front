import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const updateUserAsync = createAsyncThunk(
	'auth/updateUserAsync',
	async (userData, { rejectWithValue }) => {
		try {
			const {
				data: { data: user },
			} = await axios.patch('/users/user', userData);
			return { user };
		} catch (err) {
			return serverErrorCatcher(err, 'error updateUser', rejectWithValue);
		}
	},
);
