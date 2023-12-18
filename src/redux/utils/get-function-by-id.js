import {
	fetchLogout,
	removeCommentAsync,
	removeProductAsync,
	removeUserAsync,
} from '../actions';

export const getFunctionById = (id) => {
	const functions = {
		fetchLogout,
		removeCommentAsync,
		removeProductAsync,
		removeUserAsync,
	};
	return functions[id];
};
