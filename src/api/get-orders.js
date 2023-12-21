import axios from 'axios';

export const getOrders = async () => {
	try {
		return axios.get('/orders');
	} catch (err) {
		console.log('error get orders', err);
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
