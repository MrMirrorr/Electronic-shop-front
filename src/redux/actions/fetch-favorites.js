import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchFavorites = createAsyncThunk(
	'products/fetchFavorites',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get(`/favorites`, { timeout: 3000 });

			const {
				data: {
					data: { favorites },
				},
			} = res;

			return { favorites };
		} catch (err) {
			return serverErrorCatcher(err, 'error fetchFavorites', rejectWithValue);
		}
	},
);
