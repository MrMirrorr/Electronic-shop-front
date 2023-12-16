import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const removeCommentAsync = createAsyncThunk(
	'product/removeCommentAsync',
	async (commentData, { rejectWithValue }) => {
		console.log(commentData);
		try {
			const { productId, commentId } = commentData;

			const {
				data: { error },
			} = await axios.delete(`/products/${productId}/comments/${commentId}`, {
				timeout: '3000',
			});

			return { commentId, error };
		} catch (err) {
			console.log('error fetchProduct', err);
			if (err.response.data.error) {
				return rejectWithValue({
					error: err.response.data.error,
				});
			}
			if (err.code === 'ERR_BAD_RESPONSE') {
				return rejectWithValue({
					error: 'Комментарий не был удален, попробуйте еще раз позднее',
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
