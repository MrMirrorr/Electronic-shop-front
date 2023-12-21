import { createSlice } from '@reduxjs/toolkit';
import { addFavoriteAsync, fetchFavorites } from '../actions';

const initialState = {
	favorites: [],
	isLoading: true,
	error: null,
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFavorites.pending, (state) => {
				state.items = [];
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchFavorites.fulfilled, (state, action) => {
				state.favorites = action.payload.favorites;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(fetchFavorites.rejected, (state, action) => {
				state.items = [];
				state.isLoading = false;
				state.error = action.payload.error;
			})
			.addCase(addFavoriteAsync.pending, (state) => {})
			.addCase(addFavoriteAsync.fulfilled, (state, action) => {
				if (action.payload.operation === 'CREATE') {
					state.favorites.push(action.payload.favorite);
				} else {
					state.favorites = state.favorites.filter(
						(favorite) => favorite.product.id !== action.payload.productId,
					);
				}
			})
			.addCase(addFavoriteAsync.rejected, (state, action) => {
				state.error = action.payload.error;
			});
	},
});

export const favoritesReducer = favoritesSlice.reducer;
