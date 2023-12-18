import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addCartItemAsync = createAsyncThunk(
	'cart/addCartItemAsync',
	async (itemData, { rejectWithValue }) => {
		try {
			const {
				data: {
					data: { cartItem },
				},
			} = await axios.post(`/items`, itemData, { timeout: '3000' });

			return { cartItem };
		} catch (err) {
			console.log('error addCartItem', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Товар не был добавлен в корзину, попробуйте еще раз позднее',
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
