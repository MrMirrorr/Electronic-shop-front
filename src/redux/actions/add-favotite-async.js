import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const addFavoriteAsync = createAsyncThunk(
	'favorite/addFavoriteAsync',
	async (productId, { rejectWithValue }) => {
		try {
			const {
				data: {
					operation,
					data: { favorite },
				},
			} = await axios.post(`/favorites/product/${productId}`, {
				timeout: '3000',
			});

			return { operation, favorite, productId };
		} catch (err) {
			return serverErrorCatcher(err, 'error addFavorite', rejectWithValue);
		}
	},
);
