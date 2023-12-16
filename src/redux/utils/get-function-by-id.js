import { fetchLogout, removeCommentAsync } from '../actions';

export const getFunctionById = (id) => {
	const functions = {
		fetchLogout,
		removeCommentAsync,
	};
	return functions[id];
};
