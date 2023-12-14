import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import { categoriesReducer } from './slices/categories';

const store = configureStore({
	reducer: {
		products: productsReducer,
		categories: categoriesReducer,
	},
});

export default store;
