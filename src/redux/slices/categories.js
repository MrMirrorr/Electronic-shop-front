import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../actions';

const initialState = {
	categories: [],
	isLoading: true,
	error: null,
	active: '',
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setActiveCategory(state, action) {
			state.active = action.payload;
		},
		resetActiveCategory(state) {
			state.active = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, () => initialState)
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.error = initialState.error;
				state.categories = action.payload.categories;
				state.isLoading = false;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.categories = initialState.categories;
				state.isLoading = false;
				state.error = action.payload.error;
			});
	},
});

export const { setActiveCategory, resetActiveCategory } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
