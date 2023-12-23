import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, removeProductAsync } from '../actions';

const initialState = {
	products: [],
	lastPage: 1,
	isLoading: true,
	error: null,
	removeIsLoading: false,
	deletionError: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: (builder) => {
		builder
			// fetch products
			.addCase(fetchProducts.pending, (state) => {
				state.products = [];
				state.lastPage = 1;
				state.isLoading = true;
				state.error = null;
				state.removeIsLoading = false;
				state.deletionError = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.error = null;
				state.products = action.payload.products;
				state.lastPage = action.payload.lastPage;
				state.isLoading = false;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.products = [];
				state.lastPage = 1;
				state.isLoading = false;
				state.error = action.payload.error;
			})

			// remove product
			.addCase(removeProductAsync.pending, (state) => {
				state.removeIsLoading = true;
				state.deletionError = null;
			})
			.addCase(removeProductAsync.fulfilled, (state, action) => {
				state.products = state.products.filter(
					(product) => product.id !== action.payload.id,
				);
				state.removeIsLoading = false;
				state.deletionError = null;
			})
			.addCase(removeProductAsync.rejected, (state, action) => {
				state.removeIsLoading = false;
				state.deletionError = action.payload.error;
			});
	},
});

export const productsReducer = productsSlice.reducer;
