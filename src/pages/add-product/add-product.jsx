import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addProductFormScheme } from '../../yup-schemes';
import { fetchCategories } from '../../redux/actions';
import { selectCategories } from '../../redux/selectors';
import { createProduct } from '../../api';
import { AuthFormError, Button, Container, Input } from '../../components';
import styled from 'styled-components';

const AddProductContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			categoryId: '',
			price: 0,
			amount: 0,
			imageUrl: '',
			description: '',
		},
		resolver: yupResolver(addProductFormScheme),
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { categories } = useSelector(selectCategories);
	const [serverError, setServerError] = useState(null);

	const onSelectCategory = ({ target }) => {
		setValue(target.value);
	};

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const onSubmit = async (data) => {
		const res = await createProduct(data);

		if (res.error) {
			setServerError(res.error);
			return;
		}

		setServerError(null);
		navigate(`/product/${res.newProduct.id}`);
	};

	const formError =
		errors?.title?.message ||
		errors?.categoryId?.message ||
		errors?.price?.message ||
		errors?.amount?.message ||
		errors?.imageUrl?.message ||
		errors?.description?.message;

	const errorMessage = formError || serverError;

	return (
		<div className={className}>
			<Container>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						placeholder="Наименование"
						{...register('title')}
					/>
					<select
						type="select"
						onChange={onSelectCategory}
						{...register('categoryId')}
					>
						<option value="0">Выберите категорию</option>
						{categories.map(({ id, title }) => (
							<option key={id} value={id}>
								{title}
							</option>
						))}
					</select>
					<Input type="number" placeholder="Стоимость" {...register('price')} />
					<Input
						type="number"
						placeholder="Количество"
						{...register('amount')}
					/>
					<Input
						type="text"
						placeholder="Изображение (URL)"
						{...register('imageUrl')}
					/>
					<textarea
						placeholder="Описание и характеристики"
						{...register('description')}
					/>
					<Button
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="20px"
						uppercase={true}
						type="submit"
					>
						Сохранить и добавить
					</Button>
					{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				</form>
			</Container>
		</div>
	);
};

export const AddProduct = styled(AddProductContainer)`
	padding: 30px 0;

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 500px;
	}

	textarea,
	select {
		padding: 10px 20px;
		border-radius: 5px;
		border: 1px solid #000;
		background: #fff;
	}

	textarea {
		resize: vertical;
	}
`;
