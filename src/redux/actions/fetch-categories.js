import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
			console.log('error fetchProducts', err.message);
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Категории не были получены с сервера, попробуйте еще раз позднее',
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
