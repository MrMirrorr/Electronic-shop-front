import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addFavoriteAsync = createAsyncThunk(
	'favorite/addFavoriteAsync',
	async (productId, { rejectWithValue }) => {
		try {
			const {
				data: {
					operation,
					data: { favorite },
				},
			} = await axios.post(`/favorites/product/${productId}`, {
				timeout: '3000',
			});

			return { operation, favorite, productId };
		} catch (err) {
			console.log('error addFavorite', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Товар не был добавлен в избранное, попробуйте еще раз позднее',
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
