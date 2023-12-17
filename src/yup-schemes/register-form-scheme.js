import * as yup from 'yup';

export const registerFormScheme = yup.object().shape({
	fullName: yup
		.string()
		.required('Введите ваше полное имя')
		.min(2, 'Полное имя минимум 2 символа.')
		.max(30, 'Максимум 40 символов.'),
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
	confirmPassword: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});
