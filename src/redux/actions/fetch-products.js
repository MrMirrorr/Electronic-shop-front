import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	try {
		const res = await Promise.race([
			axios.get('/products'),
			new Promise((_, reject) => setTimeout(() => reject(new Error()), 3000)),
		]);

		const {
			data: {
				data: { products, lastPage },
				error,
			},
		} = res;

		return { products, lastPage, error };
	} catch (err) {
		return { error: 'Вероятно, сервер спит =).' };
	}
});
