import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserAsync = createAsyncThunk(
	'auth/updateUserAsync',
	async (userData, { rejectWithValue }) => {
		try {
			const {
				data: { data: user },
			} = await axios.patch('/users/user', userData);
			return { user };
		} catch (err) {
			console.log('error update user', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.response.data.msg) {
				return {
					error: err.response.data.msg,
				};
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Пользователь не был обновлен, попробуйте еще раз позднее',
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
