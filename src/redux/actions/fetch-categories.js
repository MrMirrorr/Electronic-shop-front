import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get('/categories', { timeout: 3000 });

			const {
				data: { data, error },
			} = res;

			return { categories: data, error };
		} catch (err) {
			return serverErrorCatcher(err, 'error fetchCategories', rejectWithValue);
		}
	},
);
