import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const removeProductAsync = createAsyncThunk(
	'products/removeProductAsync',
	async (id, { rejectWithValue }) => {
		try {
			await axios.delete(`/products/${id}`, {
				timeout: '3000',
			});

			return { id };
		} catch (err) {
			return serverErrorCatcher(err, 'error removeProduct', rejectWithValue);
		}
	},
);
