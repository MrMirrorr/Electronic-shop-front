import { fetchLogout, removeCommentAsync, removeProductAsync } from '../actions';

export const getFunctionById = (id) => {
	const functions = {
		fetchLogout,
		removeCommentAsync,
		removeProductAsync,
	};
	return functions[id];
};
