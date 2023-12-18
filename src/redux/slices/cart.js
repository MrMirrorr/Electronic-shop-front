import { createSlice } from '@reduxjs/toolkit';
import { addCartItemAsync, fetchCart, removeCartItemAsync } from '../actions';

const initialState = {
	cart: null,
	items: [],
	isLoadingCart: true,
	isLoadingItems: false,
	error: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		resetCart(state) {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.pending, (state) => {
				state.isLoadingCart = true;
				state.error = null;
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.cart = action.payload.cart;
				state.items = action.payload.items;
				state.isLoadingCart = false;
				state.error = null;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.cart = null;
				state.items = action.payload.items;
				state.isLoadingCart = false;
				state.error = action.payload.error;
			})
			.addCase(addCartItemAsync.pending, (state) => {
				state.isLoadingItems = true;
				state.error = null;
			})
			.addCase(addCartItemAsync.fulfilled, (state, action) => {
				const findItemIndex = state.items.findIndex(
					(item) => item.id === action.payload.cartItem.id,
				);

				if (findItemIndex !== -1) {
					state.items[findItemIndex].quantity += 1;
				} else {
					state.items.push(action.payload.cartItem);
				}

				state.isLoadingItems = false;
				state.error = null;
			})
			.addCase(addCartItemAsync.rejected, (state, action) => {
				state.isLoadingItems = false;
				state.error = action.payload.error;
			})
			.addCase(removeCartItemAsync.pending, (state) => {
				state.isLoadingItems = true;
				state.error = null;
			})
			.addCase(removeCartItemAsync.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(item) => item.id !== action.payload.itemId,
				);
				state.isLoadingItems = false;
				state.error = null;
			})
			.addCase(removeCartItemAsync.rejected, (state, action) => {
				state.isLoadingItems = false;
				state.error = action.payload.error;
			});
	},
});

export const { resetCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
