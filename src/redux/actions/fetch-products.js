import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
			console.log('error fetchProducts', err);
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Товары не были получены с сервера, попробуйте еще раз позднее',
				});
			}
			if (err.code === 'ECONNABORTED') {
				return rejectWithValue({
					error: 'Превышено время ожидания ответа',
				});
			}
			return rejectWithValue({
				error: 'Что-то пошло не так',
			});
		}
	},
);
