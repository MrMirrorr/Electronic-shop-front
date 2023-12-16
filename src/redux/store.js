import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import { categoriesReducer } from './slices/categories';
import { authReducer } from './slices/auth';
import { uiReducer } from './slices/ui';
import { productReducer } from './slices/product';

const store = configureStore({
	reducer: {
		products: productsReducer,
		categories: categoriesReducer,
		auth: authReducer,
		ui: uiReducer,
		product: productReducer,
	},
});

export default store;
