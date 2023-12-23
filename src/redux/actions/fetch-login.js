import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCart } from './fetch-cart';
import { fetchFavorites } from './fetch-favorites';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchLogin = createAsyncThunk(
	'auth/fetchLogin',
	async (values, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.post('/auth/login', values, { timeout: 3000 });
			await dispatch(fetchCart());
			await dispatch(fetchFavorites());

			const {
				data: { data, error },
			} = res;

			return { user: data, error };
		} catch (err) {
			return serverErrorCatcher(err, 'error auth', rejectWithValue);
		}
	},
);
