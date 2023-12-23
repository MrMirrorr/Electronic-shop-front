import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (values, { rejectWithValue }) => {
		try {
			const res = await axios.post('/auth/register', values, { timeout: 3000 });

			const {
				data: { data, error },
			} = res;

			return { user: data, error };
		} catch (err) {
			return serverErrorCatcher(err, 'error register', rejectWithValue);
		}
	},
);
