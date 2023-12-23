import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const removeCartItemAsync = createAsyncThunk(
	'cart/removeCartItemAsync',
	async (itemId, { rejectWithValue }) => {
		try {
			await axios.delete(`/items/${itemId}`, {
				timeout: '3000',
			});

			return { itemId };
		} catch (err) {
			return serverErrorCatcher(err, 'error removeCartItem', rejectWithValue);
		}
	},
);
