import axios from 'axios';
import { serverErrorHandler } from '../utils';

export const createOrder = async (orderData, cartId) => {
	try {
		return await Promise.all([
			axios.post('/orders', orderData),
			axios.delete(`/items/cart/${cartId}`, {
				timeout: '3000',
			}),
		]);
	} catch (err) {
		serverErrorHandler(err, 'error create order');
	}
};
