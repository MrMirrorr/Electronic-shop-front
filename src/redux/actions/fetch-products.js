import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (params, { rejectWithValue }) => {
		try {
			const { search, limit, page, category, sort } = params;

			const res = await axios.get(
				`/products?search=${search}&limit=${limit}&page=${page}&category=${category}&sort=${sort}`,
				{ timeout: 3000 },
			);

			const {
				data: {
					data: { products, lastPage },
					error,
				},
			} = res;

			return { products, lastPage, error };
		} catch (err) {
			return serverErrorCatcher(err, 'error fetchProducts', rejectWithValue);
		}
	},
);
