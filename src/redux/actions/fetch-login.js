import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchCart } from './fetch-cart';

export const fetchLogin = createAsyncThunk(
	'auth/fetchLogin',
	async (values, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.post('/auth/login', values, { timeout: 3000 });
			await dispatch(fetchCart());

			const {
				data: { data, error },
			} = res;

			return { user: data, error };
		} catch (err) {
			console.log('error auth', err);
			if (err.response.data.msg) {
				return rejectWithValue({
					error: err.response.data.msg,
				});
			}
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ECONNABORTED') {
				return rejectWithValue({
					error: 'Превышено время ожидания ответа',
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Нет связи с сервером, попробуйте еще раз позднее',
				});
			}
			return rejectWithValue({
				error: 'Что-то пошло не так',
			});
		}
	},
);
