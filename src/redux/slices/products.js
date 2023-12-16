import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions';

const initialState = {
	products: [],
	lastPage: 1,
	isLoading: true,
	error: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, () => initialState)
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.error = initialState.error;
				state.products = action.payload.products;
				state.lastPage = action.payload.lastPage;
				state.isLoading = false;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.products = initialState.products;
				state.lastPage = initialState.lastPage;
				state.isLoading = false;
				state.error = action.payload.error;
			});
	},
});

export const productsReducer = productsSlice.reducer;
