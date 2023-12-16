import { createSlice } from '@reduxjs/toolkit';
import { SORT_DIRECTION } from '../../constants';

const initialState = {
	modal: {
		isOpen: false,
		text: '',
		onConfirmId: null,
		onConfirmParams: null,
	},
	search: {
		value: '',
		shouldSearch: false,
	},
	sort: SORT_DIRECTION.ASC,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal(state, action) {
			state.modal.isOpen = true;
			state.modal.text = action.payload.text;
			state.modal.onConfirmId = action.payload.onConfirmId;
			state.modal.onConfirmParams = action.payload?.onConfirmParams;
		},
		closeModal(state) {
			state.modal = initialState.modal;
		},
		setSearchValue(state, action) {
			state.search.value = action.payload;
		},
		setShouldSearch(state, action) {
			state.search.shouldSearch = !state.search.shouldSearch;
		},
		setSortDirection(state, action) {
			state.sort = action.payload;
		},
	},
});

export const {
	closeModal,
	openModal,
	setSearchValue,
	setShouldSearch,
	setSortDirection,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
