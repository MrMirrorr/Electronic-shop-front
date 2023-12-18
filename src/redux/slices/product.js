import { createSlice } from '@reduxjs/toolkit';
import { addCommentAsync, fetchProduct, removeCommentAsync } from '../actions';

const initialState = {
	product: null,
	comments: [],
	isLoadingProduct: true,
	isLoadingComments: false,
	errorProduct: null,
	errorComment: null,
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		resetProduct(state) {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProduct.pending, (state) => {
				state.isLoadingProduct = true;
				state.errorProduct = null;
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.product = action.payload.product;
				state.comments = action.payload.comments;
				state.isLoadingProduct = false;
				state.errorProduct = null;
			})
			.addCase(fetchProduct.rejected, (state, action) => {
				state.product = null;
				state.comments = action.payload.comments;
				state.isLoadingProduct = false;
				state.errorProduct = action.payload.error;
			})
			.addCase(addCommentAsync.pending, (state) => {
				state.isLoadingComments = true;
				state.errorComment = null;
			})
			.addCase(addCommentAsync.fulfilled, (state, action) => {
				state.comments.unshift(action.payload.comment);
				state.isLoadingComments = false;
				state.errorComment = null;
			})
			.addCase(addCommentAsync.rejected, (state, action) => {
				state.isLoadingComments = false;
				state.errorComment = action.payload.error;
			})
			.addCase(removeCommentAsync.pending, (state) => {
				state.isLoadingComments = true;
				state.errorComment = null;
			})
			.addCase(removeCommentAsync.fulfilled, (state, action) => {
				state.comments = state.comments.filter(
					(comment) => comment.id !== action.payload.commentId,
				);
				state.isLoadingComments = false;
				state.errorComment = null;
			})
			.addCase(removeCommentAsync.rejected, (state, action) => {
				state.isLoadingComments = false;
				state.errorComment = action.payload.error;
			});
	},
});

export const { resetProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
