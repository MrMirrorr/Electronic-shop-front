import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchLogout } from './fetch-logout';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchAuthMe = createAsyncThunk(
	'auth/fetchAuthMe',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.get('/auth/me', { timeout: 3000 });

			const {
				data: { data, error },
			} = res;

			return { user: data, error };
		} catch (err) {
			if (err.response.data.error) {
				console.log('error auth', err);
				err.response.data.error === 'Отсутствует аутентификация' &&
					dispatch(fetchLogout);
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			return serverErrorCatcher(err, 'error fetchAuthMe', rejectWithValue);
		}
	},
);
