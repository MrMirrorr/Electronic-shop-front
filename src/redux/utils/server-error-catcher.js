export const serverErrorCatcher = (errorObject, logErrorName, rejectWithValue) => {
	console.log(logErrorName, errorObject);
	if (errorObject.response.data.msg) {
		return rejectWithValue({
			error: errorObject.response.data.msg,
		});
	}
	if (errorObject.response.data.error) {
		return rejectWithValue({
			error: errorObject.response.data.error,
		});
	}
	if (errorObject.code === 'ERR_BAD_RESPONSE') {
		return rejectWithValue({
			error: 'Сервер не отвечает, попробуйте еще раз позднее',
		});
	}
	if (errorObject.code === 'ECONNABORTED') {
		return rejectWithValue({
			error: 'Превышено время ожидания ответа',
		});
	}
	return rejectWithValue({
		error: 'Что-то пошло не так',
	});
};
