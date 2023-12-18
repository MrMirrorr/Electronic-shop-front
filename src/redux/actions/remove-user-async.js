import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const removeUserAsync = createAsyncThunk(
	'users/removeUserAsync',
	async (id, { rejectWithValue }) => {
		try {
			await axios.delete(`/users/${id}`, {
				timeout: '3000',
			});

			return { id };
		} catch (err) {
			console.log('error fetchProduct', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Пользователь не был удален, попробуйте еще раз позднее',
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
