import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addCommentAsync = createAsyncThunk(
	'product/addCommentAsync',
	async (commentData, { rejectWithValue }) => {
		try {
			const { productId, newComment } = commentData;

			const {
				data: { data, error },
			} = await axios.post(
				`/products/${productId}/comments`,
				{ content: newComment },
				{
					timeout: '3000',
				},
			);

			return { comment: data, error };
		} catch (err) {
			console.log('error fetchProduct', err);
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
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Комментарий не был отправлен, попробуйте еще раз позднее',
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
