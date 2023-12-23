import { createSlice } from '@reduxjs/toolkit';
import { addCartItemAsync, fetchCart, removeCartItemAsync } from '../actions';

const initialState = {
	cart: null,
	items: [],
	isLoadingCart: true,
	error: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		resetCart(state) {
			state.cart = null;
			state.items = [];
			state.isLoadingCart = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// fetch cart
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
				state.items = [];
				state.isLoadingCart = false;
				state.error = action.payload.error;
			})

			// add cart item
			.addCase(addCartItemAsync.pending, (state) => {
				state.error = null;
			})
			.addCase(addCartItemAsync.fulfilled, (state, action) => {
				const findItemIndex = state.items.findIndex(
					(item) => item.id === action.payload.cartItem.id,
				);

				if (findItemIndex !== -1) {
					state.items[findItemIndex].quantity += action.payload.quantity;
				} else {
					state.items.push(action.payload.cartItem);
				}

				state.error = null;
			})
			.addCase(addCartItemAsync.rejected, (state, action) => {
				state.error = action.payload.error;
			})

			// remove cart item
			.addCase(removeCartItemAsync.pending, (state) => {
				state.error = null;
			})
			.addCase(removeCartItemAsync.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(item) => item.id !== action.payload.itemId,
				);
				state.error = null;
			})
			.addCase(removeCartItemAsync.rejected, (state, action) => {
				state.error = action.payload.error;
			});
	},
});

export const { resetCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
