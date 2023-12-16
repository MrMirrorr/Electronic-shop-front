import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogin = createAsyncThunk(
	'auth/fetchLogin',
	async (values, { rejectWithValue }) => {
		try {
			const res = await axios.post('/auth/login', values, { timeout: 3000 });

			const {
				data: { data, error },
			} = res;

			return { user: data, error };
		} catch (err) {
			console.log('error auth', err);
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Нет связи с сервером, попробуйте еще раз позднее',
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
			if (err.response.data.msg) {
				return rejectWithValue({
					error: err.response.data.msg,
				});
			}
			return rejectWithValue({
				error: 'Что-то пошло не так',
			});
		}
	},
);