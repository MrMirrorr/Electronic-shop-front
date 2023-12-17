import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormScheme } from '../../yup-schemes';
import { resetServerError } from '../../redux/slices/auth';
import { fetchRegister } from '../../redux/actions';
import { selectAuth, selectIsAuth } from '../../redux/selectors';
import { AuthFormError, Button, Container, Icon, Input } from '../../components';
import styled from 'styled-components';

const RegistrationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerFormScheme),
	});

	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const { error: serverError, isLoading } = useSelector(selectAuth);

	useEffect(() => {
		dispatch(resetServerError());
	}, [dispatch]);

	const onSubmit = (values) => {
		dispatch(fetchRegister(values));
	};

	const formError =
		errors?.fullName?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.confirmPassword?.message;
	const errorMessage = formError || serverError;

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Регистрация</h2>
			<Container>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						type="fullName"
						placeholder="Полное имя"
						{...register('fullName', {
							onChange: () => dispatch(resetServerError()),
						})}
					/>
					<Input
						type="email"
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
					<Input
						type="password"
						placeholder="Повтор пароля"
						{...register('confirmPassword', {
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
							'Зарегистрироваться'
						)}
					</Button>
					{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				</form>
			</Container>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	text-align: center;

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 300px;
		margin: 0 auto;

		input {
			padding: 10px 20px;
			border-radius: 5px;
			border: 1px solid #000;
			background: #fff;
		}
	}
`;
