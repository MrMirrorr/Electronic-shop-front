import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		try {
			const res = await Promise.race([
				axios.get('/categories'),
				new Promise((_, reject) => setTimeout(() => reject(new Error()), 3000)),
			]);

			const {
				data: { data, error },
			} = res;

			return { categories: data, error };
		} catch (err) {
			return { error: 'Категории не были загружены' };
		}
	},
);
