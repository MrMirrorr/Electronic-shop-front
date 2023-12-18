import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const removeCartItemAsync = createAsyncThunk(
	'cart/removeCartItemAsync',
	async (itemId, { rejectWithValue }) => {
		try {
			await axios.delete(`/items/${itemId}`, {
				timeout: '3000',
			});

			return { itemId };
		} catch (err) {
			console.log('error removeCartItem', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Товар не был удален из корзины, попробуйте еще раз позднее',
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
