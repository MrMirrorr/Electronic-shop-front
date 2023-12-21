import * as yup from 'yup';

export const editUserFormScheme = yup.object().shape({
	fullName: yup
		.string()
		.required('Введите ваше полное имя')
		.min(2, 'Полное имя минимум 2 символа.')
		.max(30, 'Максимум 40 символов.'),
	email: yup.string().required('Заполните почту').email('Не валидная почта'),
});
