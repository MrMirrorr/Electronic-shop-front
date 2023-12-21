import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetCart } from '../slices/cart';

export const fetchLogout = createAsyncThunk(
	'auth/fetchLogout',
	async (_, { dispatch }) => {
		try {
			await axios.post('/auth/logout');
			dispatch(resetCart());
		} catch (err) {
			console.log('error', err);
		}
	},
);
