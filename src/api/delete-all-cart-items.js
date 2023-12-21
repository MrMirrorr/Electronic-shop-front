import axios from 'axios';

export const deleteAllCartItems = async (cartId) => {
	try {
		const { data } = await axios.delete(`/items/cart/${cartId}`, {
			timeout: '3000',
		});

		return data;
	} catch (err) {
		console.log('error deleteAllCartItems', err);
		if (err.response.data.error) {
			return {
				error: err.response.data.error,
			};
		}
		if (err.code === 'ERR_BAD_RESPONSE') {
			return {
				error: 'Товары не были удалены из корзины, попробуйте еще раз позднее',
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
