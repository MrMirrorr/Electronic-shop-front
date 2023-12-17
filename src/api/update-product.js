import axios from 'axios';

export const updateProduct = async (data, id) => {
	try {
		const {
			data: { data: newProduct },
		} = await axios.patch(`/products/${id}`, data);
		return newProduct;
	} catch (err) {
		console.log('error update product', err);
		if (err.response.data.error) {
			return {
				error: err.response.data.error,
			};
		}
		if (err.response.data.msg) {
			return {
				error: err.response.data.msg,
			};
		}
		if (err.code === 'ERR_BAD_RESPONSE') {
			return {
				error: 'Нет связи с сервером, попробуйте еще раз позднее',
			};
		}
		if (err.code === 'ECONNABORTED') {
			return {
				error: 'Превышено время ожидания ответа',
			};
		}
		return {
			error: 'Что-то пошло не так',
		};
	}
};
