export const serverErrorHandler = (errorObject, logErrorName) => {
	console.log(logErrorName, errorObject);
	if (errorObject.response.data.error) {
		return {
			error: errorObject.response.data.error,
		};
	}
	if (errorObject.response.data.msg) {
		return {
			error: errorObject.response.data.msg,
		};
	}
	if (errorObject.code === 'ERR_BAD_RESPONSE') {
		return {
			error: 'Нет связи с сервером, попробуйте еще раз позднее',
		};
	}
	if (errorObject.code === 'ECONNABORTED') {
		return {
			error: 'Превышено время ожидания ответа',
		};
	}
	return {
		error: 'Что-то пошло не так',
	};
};
