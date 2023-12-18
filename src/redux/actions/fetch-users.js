import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const usersRes = await axios.get(`/users`, { timeout: 3000 });
			const rolesRes = await axios.get('users/roles', { timeout: 3000 });

			const {
				data: { data: roles },
			} = rolesRes;

			const {
				data: { data: users, error },
			} = usersRes;

			return { users, roles, error };
		} catch (err) {
			console.log('error fetchUsers', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Пользователи не были получены с сервера, попробуйте еще раз позднее',
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
