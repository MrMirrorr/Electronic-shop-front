import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchProduct = createAsyncThunk(
	'product/fetchProduct',
	async (productId, { rejectWithValue }) => {
		try {
			const {
				data: {
					data: { comments, ...product },
					error,
				},
			} = await axios.get(`/products/${productId}`, { timeout: '3000' });

			return { product, comments, error };
		} catch (err) {
			return serverErrorCatcher(err, 'error fetchProduct', rejectWithValue);
		}
	},
);
