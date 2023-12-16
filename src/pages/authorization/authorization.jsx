import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchLogin } from '../../redux/actions';
import { resetServerError } from '../../redux/slices/auth';
import { selectAuth, selectIsAuth } from '../../redux/selectors';
import { AuthFormError, Button, Container, Icon, Input } from '../../components';
import styled from 'styled-components';

const authFormSchema = yup.object().shape({
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

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const { error: serverError, isLoading } = useSelector(selectAuth);

	useEffect(() => {
		dispatch(resetServerError());
	}, [dispatch]);

	const onSubmit = (values) => {
		dispatch(fetchLogin(values));
	};

	const formError = errors?.email?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<Container>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="text"
						placeholder="Почта"
						{...register('email', {
							onChange: () => dispatch(resetServerError()),
						})}
					/>
					<Input
						type="password"
						placeholder="Пароль"
						{...register('password', {
							onChange: () => dispatch(resetServerError()),
						})}
					/>
					<Button
						type="submit"
						width="100%"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="10px"
						uppercase={true}
						disabled={isLoading || errorMessage}
					>
						{isLoading ? (
							<Icon id="fa-spinner fa-pulse fa-fw" />
						) : (
							'Авторизоваться'
						)}
					</Button>
					{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				</form>
				<Link to="/registration">Зарегистрироваться</Link>
			</Container>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	text-align: center;

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 300px;
		margin: 0 auto 20px;

		input {
			padding: 10px 20px;
			border-radius: 5px;
			border: 1px solid #000;
			background: #fff;
		}
	}

	a {
		text-decoration: underline;
	}
`;
