import { fetchLogout } from '../actions';

export const getFunctionById = (id) => {
	const functions = {
		fetchLogout,
	};
	return functions[id];
};
