import axios from 'axios';
import { serverErrorHandler } from '../utils';

export const updateUserRole = async (id, data) => {
	try {
		const res = await axios.patch(`/users/${id}/role`, data);

		const {
			data: { data: newUser },
		} = res;

		return newUser;
	} catch (err) {
		serverErrorHandler(err, 'error update user role');
	}
};
