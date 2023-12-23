import axios from 'axios';
import { serverErrorHandler } from '../utils';

export const createProduct = async (data) => {
	try {
		const {
			data: { data: newProduct },
		} = await axios.post('/products', data);

		return { newProduct };
	} catch (err) {
		serverErrorHandler(err, 'error create product');
	}
};
