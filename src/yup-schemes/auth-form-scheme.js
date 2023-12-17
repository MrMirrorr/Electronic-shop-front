import * as yup from 'yup';

export const authFormScheme = yup.object().shape({
	email: yup.string().required('Заполните почту').email('Не валидная почта'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и символы # %',
		)
		.min(6, 'Неверный пароль. Минимум 6 символов.')
		.max(30, 'Неверный пароль. Максимум 30 символов.'),
});
