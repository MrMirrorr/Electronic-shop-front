import * as yup from 'yup';

export const addProductFormScheme = yup.object().shape({
	title: yup
		.string('Наименование должно быть текстом')
		.required('Введите название товара')
		.min(2, 'Название товара минимум 2 символа.')
		.max(90, 'Максимум 90 символов.'),
	categoryId: yup
		.string('Категория должна быть текстом')
		.required('Выберите категорию')
		.test('is-not-zero', 'Выберите категорию', (value) => value !== '0'),
	price: yup
		.number('Цена должна быть числом')
		.required('Введите цену')
		.test('no-leading-zeros', 'Цена не должна начинаться с нулей', (value) =>
			/^[1-9]\d*$/.test(value),
		),
	amount: yup
		.number('Количество должно быть числом')
		.required('Введите количество')
		.test('no-leading-zeros', 'количество не должна начинаться с нулей', (value) =>
			/^[1-9]\d*$/.test(value),
		),
	imageUrl: yup.string('Ссылка на изображение должна быть текстом'),
	description: yup
		.string('Описание должно быть тестом')
		.required('Введите описание')
		.min(6, 'Описание товара минимум 6 символов.'),
});
