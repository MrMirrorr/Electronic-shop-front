import axios from 'axios';

export const createProduct = async (data) => {
	try {
		const {
			data: { data: newProduct },
		} = await axios.post('/products', data);

		return { newProduct };
	} catch (err) {
		console.log('error create product', err);
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
		return {
			error: 'Что-то пошло не так',
		};
	}
};
