import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

export const removeCommentAsync = createAsyncThunk(
	'product/removeCommentAsync',
	async (commentData, { rejectWithValue }) => {
		try {
			const { productId, commentId } = commentData;

			const {
				data: { error },
			} = await axios.delete(`/products/${productId}/comments/${commentId}`, {
				timeout: '3000',
			});

			return { commentId, error };
		} catch (err) {
			return serverErrorCatcher(err, 'error removeComment', rejectWithValue);
		}
	},
);
