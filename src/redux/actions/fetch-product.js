import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProduct = createAsyncThunk(
	'product/fetchProduct',
	async (productId, { rejectWithValue }) => {
		try {
			const {
				data: {
					data: { comments, ...product },
					error,
				},
			} = await axios.get(`/products/${productId}`, { timeout: '3000' });

			return { product, comments, error };
		} catch (err) {
			console.log('error fetchProduct', err);
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Товар не был получен с сервера, попробуйте еще раз позднее',
				});
			}
			if (err.code === 'ECONNABORTED') {
				return rejectWithValue({
					error: 'Превышено время ожидания ответа',
				});
			}
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			return rejectWithValue({
				error: 'Что-то пошло не так',
			});
		}
	},
);
