import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk(
	'cart/fetchCart',
	async (_, { rejectWithValue }) => {
		try {
			const {
				data: {
					data: { items, ...cart },
				},
			} = await axios.get(`/cart`, { timeout: '3000' });

			return { cart, items };
		} catch (err) {
			console.log('error fetchCart', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
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
			return rejectWithValue({
				error: 'Что-то пошло не так',
			});
		}
	},
);
