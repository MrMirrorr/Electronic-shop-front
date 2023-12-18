import axios from 'axios';

export const updateUserRole = async (id, data) => {
	try {
		const res = await axios.patch(`/users/${id}`, data);

		const {
			data: { data: newUser },
		} = res;

		return newUser;
	} catch (err) {
		console.log('error update product', err);
		if (err.response.data.error) {
			return {
				error: err.response.data.error,
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
