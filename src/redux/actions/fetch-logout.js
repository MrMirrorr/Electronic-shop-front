import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetCart } from '../slices/cart';
import { resetUsers } from '../slices/users';
import { resetFavorites } from '../slices/favorites';

export const fetchLogout = createAsyncThunk(
	'auth/fetchLogout',
	async (_, { dispatch }) => {
		try {
			await axios.post('/auth/logout');
			dispatch(resetUsers());
			dispatch(resetCart());
			dispatch(resetFavorites());
		} catch (err) {
			console.log('error', err);
		}
	},
);
