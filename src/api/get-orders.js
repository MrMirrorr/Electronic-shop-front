import axios from 'axios';
import { serverErrorHandler } from '../utils';

export const getOrders = async () => {
	try {
		return axios.get('/orders');
	} catch (err) {
		serverErrorHandler(err, 'error get orders');
	}
};
