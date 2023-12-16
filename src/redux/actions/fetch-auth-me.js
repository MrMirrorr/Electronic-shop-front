import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchLogout } from './fetch-logout';

export const fetchAuthMe = createAsyncThunk(
	'auth/fetchAuthMe',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.get('/auth/me', { timeout: 3000 });

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
				err.response.data.error === 'Отсутствует аутентификация' &&
					dispatch(fetchLogout);
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
