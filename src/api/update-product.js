import axios from 'axios';
import { serverErrorHandler } from '../utils';

export const updateProduct = async (id, data) => {
	try {
		const {
			data: { data: newProduct },
		} = await axios.patch(`/products/${id}`, data);
		return newProduct;
	} catch (err) {
		serverErrorHandler(err, 'error update product');
	}
};
