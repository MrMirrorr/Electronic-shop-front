import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFavorites = createAsyncThunk(
	'products/fetchFavorites',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get(`/favorites`, { timeout: 3000 });

			const {
				data: {
					data: { favorites },
				},
			} = res;

			return { favorites };
		} catch (err) {
			console.log('error fetchFavorites', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Избранные товары не были получены с сервера, попробуйте еще раз позднее',
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
