import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverErrorCatcher } from '../utils/server-error-catcher';

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
			return serverErrorCatcher(err, 'error fetchProduct', rejectWithValue);
		}
	},
);
