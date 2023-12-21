import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, selectIsAdmin, selectIsAuth } from '../../redux/selectors';
import { AlertError, Button, Container, Icon, Input } from '../../components';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUserFormScheme } from '../../yup-schemes';
import { useForm } from 'react-hook-form';
import { resetServerError } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';
import { updateUserAsync } from '../../redux/actions';

const ProfileContainer = ({ className }) => {
	const { user, error: serverError, isLoading } = useSelector(selectAuth);
	const avatarUrl = user?.avatarUrl;
	const email = user?.email;
	const fullName = user?.fullName;

	const isAdmin = useSelector(selectIsAdmin);
	const [isEditMode, setIsEditMode] = useState(false);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: { email },
			fullName: { fullName },
		},
		resolver: yupResolver(editUserFormScheme),
	});

	useEffect(() => {
		if (user) {
			reset({
				email: user.email,
				fullName: user.fullName,
			});
		}
	}, [reset, user, isEditMode]);

	const cancelEditMode = (e) => {
		e.preventDefault();
		setIsEditMode(false);
		dispatch(resetServerError());
	};

	const onSubmit = (values) => {
		dispatch(updateUserAsync(values)).then(() => setIsEditMode(false));
	};

	const formError = errors?.fullName?.message || errors?.email?.message;

	const errorMessage = formError || serverError;

	const renderProfile = (isEditMode) =>
		isEditMode ? (
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					{...register('email', {
						onChange: () => dispatch(resetServerError()),
					})}
				/>
				<Input
					{...register('fullName', {
						onChange: () => dispatch(resetServerError()),
					})}
				/>
				<div className="buttons">
					<Button
						width="100%"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="10px"
						onClick={cancelEditMode}
						disabled={isLoading}
					>
						Отмена
					</Button>
					<Button
						type="submit"
						width="100%"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="10px"
						disabled={isLoading}
					>
						Сохранить
					</Button>
				</div>
				{errorMessage && <AlertError>{errorMessage}</AlertError>}
			</form>
		) : (
			<>
				<Icon
					className="edit"
					id="fa-pencil-square fa-2x"
					color="#529940"
					clickable={true}
					onClick={() => setIsEditMode(true)}
				/>
				<img src={avatarUrl} alt="User avatar" />
				{isAdmin && <div className="role">Администратор</div>}
				<div>
					<span className="label">Почта:</span> {email}
				</div>
				<div>
					<span className="label">Полное имя:</span> {fullName}
				</div>
			</>
		);

	const isAuth = useSelector(selectIsAuth);
	if (!isAuth) {
		return (
			<div className={className}>
				<Container>
					<AlertError>
						Чтобы попасть на эту страницу необходимо{' '}
						<Link to="/authorization" className="link-to-auth">
							авторизоваться
						</Link>
					</AlertError>
				</Container>
			</div>
		);
	}

	return (
		<div className={className}>
			<Container>
				<h2>{isEditMode ? 'Редактирование профиля' : 'Мой профиль'}</h2>
				<div className="profile-block">{renderProfile(isEditMode)}</div>
			</Container>
		</div>
	);
};

export const Profile = styled(ProfileContainer)`
	text-align: center;

	.profile-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		max-width: 450px;
		margin: 0 auto;
		padding: 15px;
		border: 1px solid #cccccc;
		border-radius: 15px;
		box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
		position: relative;
	}

	.edit {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 1;
	}

	img {
		max-width: 300px;
		border-radius: 50%;
	}

	.role {
		color: #ffbe79;
	}

	.label {
		font-style: italic;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 300px;
		margin: 0 auto;

		.buttons {
			display: flex;
			justify-content: space-between;
			gap: 20px;
		}
	}

	.link-to-auth {
		text-decoration: underline;
	}
`;
