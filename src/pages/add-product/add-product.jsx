import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addProductFormScheme } from '../../yup-schemes';
import { fetchCategories, fetchProduct } from '../../redux/actions';
import { selectCategories, selectProduct } from '../../redux/selectors';
import { createProduct, updateProduct } from '../../api';
import { checkServerErrorAndNavigate } from './utils/check-server-error-and-navigate';
import { AlertError, Button, Container, Input } from '../../components';
import styled from 'styled-components';
import { useFileUploadInput } from '../../hooks';

const AddProductContainer = ({ className }) => {
	const params = useParams();
	const { product } = useSelector(selectProduct);
	const imageUrl = product?.imageUrl;

	const {
		register,
		handleSubmit,
		setValue,
		trigger,
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

	useEffect(() => {
		if (params.id && product) {
			setValue('title', product.title);
			setValue('categoryId', product.categoryId);
			setValue('price', product.price);
			setValue('amount', product.amount);
			setValue('imageUrl', product.imageUrl);
			setValue('description', product.description);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { categories } = useSelector(selectCategories);
	const [serverError, setServerError] = useState(null);

	const {
		onChangeFile,
		onClickRemoveImage,
		onLoadFile,
		setPreviewUrl,
		setSelectedFile,
		fileInputRef,
		previewUrl,
		selectedFile,
	} = useFileUploadInput(imageUrl, setServerError, setValue, trigger, 'imageUrl');

	const onSelectCategory = ({ target }) => {
		setValue('categoryId', target.value);
	};

	useEffect(() => {
		dispatch(fetchCategories());

		if (params.id) {
			dispatch(fetchProduct(params.id));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const onSubmit = async (data) => {
		console.log(data);
		if (params.id) {
			const res = await updateProduct(params.id, data);

			setPreviewUrl(null);
			setSelectedFile(null);
			checkServerErrorAndNavigate(res, params.id, setServerError, navigate);
			return;
		}

		const res = await createProduct(data);

		setPreviewUrl(null);
		setSelectedFile(null);
		checkServerErrorAndNavigate(res, res?.newProduct?.id, setServerError, navigate);
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
						label="Наименование"
						id="title"
						type="text"
						{...register('title', { onChange: () => setServerError(null) })}
					/>
					<Input
						variant="select"
						label="Категория"
						id="category"
						onChange={onSelectCategory}
						{...register('categoryId', {
							onChange: () => setServerError(null),
						})}
					>
						<option value="0">Выберите категорию</option>
						{categories.map(({ id, title }) => (
							<option key={id} value={id}>
								{title}
							</option>
						))}
					</Input>
					<Input
						variant="number"
						label="Цена"
						id="price"
						{...register('price', { onChange: () => setServerError(null) })}
					/>
					<Input
						variant="number"
						label="Количество"
						id="amount"
						placeholder="Количество"
						{...register('amount', { onChange: () => setServerError(null) })}
					/>
					<Input type="file" onChange={onChangeFile} ref={fileInputRef} />
					{selectedFile && (
						<div className="control-buttons">
							<Button
								width="100%"
								height="35px"
								color="#ff0000"
								fontWeight="600"
								radius="20px"
								onClick={onClickRemoveImage}
							>
								Удалить
							</Button>
							<Button
								width="100%"
								height="35px"
								color="#529940"
								fontWeight="600"
								radius="20px"
								onClick={onLoadFile}
							>
								Загрузить на сервер
							</Button>
						</div>
					)}
					{previewUrl && (
						<img className="preview-img" src={previewUrl} alt="Preview" />
					)}
					<Input
						variant="textarea"
						label="Описание и характеристики"
						id="description"
						{...register('description', {
							onChange: () => setServerError(null),
						})}
					/>
					<Button
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="20px"
						uppercase={true}
						type="submit"
						disabled={formError}
					>
						{params.id ? 'Сохранить' : 'Сохранить и добавить'}
					</Button>
					{errorMessage && <AlertError>{errorMessage}</AlertError>}
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

	.control-buttons {
		display: flex;
		justify-content: space-between;
		gap: 30px;
	}

	.preview-img {
		max-width: 150px;
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
