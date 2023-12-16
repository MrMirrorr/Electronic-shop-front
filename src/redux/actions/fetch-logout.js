import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
	try {
		await axios.post('/auth/logout');
	} catch (err) {
		console.log('error', err);
	}
});
