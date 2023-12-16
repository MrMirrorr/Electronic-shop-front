import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: {
		isOpen: false,
		text: '',
		onConfirmId: null,
		onCancelId: null,
	},
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal(state, action) {
			state.modal.isOpen = true;
			state.modal.text = action.payload.text;
			state.modal.onConfirmId = action.payload.onConfirmId;
		},
		closeModal(state) {
			state.modal = initialState.modal;
		},
	},
});

export const { closeModal, openModal } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
