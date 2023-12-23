import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const removeUserAsync = createAsyncThunk(
	'users/removeUserAsync',
	async (id, { rejectWithValue }) => {
		try {
			await axios.delete(`/users/${id}`, {
				timeout: '3000',
			});

			return { id };
		} catch (err) {
			return serverErrorCatcher(err, 'error removeUser', rejectWithValue);
		}
	},
);
