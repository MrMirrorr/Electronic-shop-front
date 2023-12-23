import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const addCartItemAsync = createAsyncThunk(
	'cart/addCartItemAsync',
	async (itemData, { rejectWithValue }) => {
		try {
			const { quantity } = itemData;
			const {
				data: {
					data: { cartItem },
				},
			} = await axios.post(`/items`, itemData, { timeout: '3000' });

			return { cartItem, quantity };
		} catch (err) {
			return serverErrorCatcher(err, 'error addCartItem', rejectWithValue);
		}
	},
);
