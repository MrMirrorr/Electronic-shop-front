import axios from 'axios';
import { serverErrorHandler } from '../utils';

export const deleteAllCartItems = async (cartId) => {
	try {
		const { data } = await axios.delete(`/items/cart/${cartId}`, {
			timeout: '3000',
		});

		return data;
	} catch (err) {
		serverErrorHandler(err, 'error deleteAllCartItems');
	}
};
