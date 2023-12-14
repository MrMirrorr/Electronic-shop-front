import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../actions';

const initialState = {
	categories: [],
	isLoading: true,
	error: null,
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, () => initialState)
			.addCase(fetchCategories.fulfilled, (state, action) => {
				if (action.payload.error) {
					state.categories = initialState.categories;
					state.isLoading = false;
					state.error = action.payload.error;
				} else {
					state.error = initialState.error;
					state.categories = action.payload.categories;
					state.isLoading = false;
				}
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.categories = initialState.categories;
				state.isLoading = false;
				state.error = action.payload.error;
			});
	},
});

export const categoriesReducer = categoriesSlice.reducer;
