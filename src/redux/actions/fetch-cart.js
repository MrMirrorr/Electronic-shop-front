import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchCart = createAsyncThunk(
	'cart/fetchCart',
	async (_, { rejectWithValue }) => {
		try {
			const {
				data: {
					data: { items, ...cart },
				},
			} = await axios.get(`/cart`, { timeout: '3000' });

			return { cart, items };
		} catch (err) {
			return serverErrorCatcher(err, 'error fetchCart', rejectWithValue);
		}
	},
);
