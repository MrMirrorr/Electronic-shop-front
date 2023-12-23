import styled from 'styled-components';
import { AlertError, Button, Input } from '../../../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUserFormScheme } from '../../../../yup-schemes';
import { useEffect } from 'react';
import { resetServerError } from '../../../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useFileUploadInput } from '../../../../hooks';
import { updateUserAsync } from '../../../../redux/actions';
import { selectAuth } from '../../../../redux/selectors';

const EditProfileFormContainer = ({ className, isEditMode, setIsEditMode }) => {
	const dispatch = useDispatch();
	const { user, error: serverError, isLoading } = useSelector(selectAuth);
	const email = user?.email;
	const fullName = user?.fullName;
	const avatarUrl = user?.avatarUrl;

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: email,
			fullName: fullName,
			avatarUrl: avatarUrl,
		},
		resolver: yupResolver(editUserFormScheme),
	});

	const clearServerError = () => {
		dispatch(resetServerError());
	};

	const {
		onChangeFile,
		onClickRemoveImage,
		onLoadFile,
		setPreviewUrl,
		setSelectedFile,
		fileInputRef,
		previewUrl,
		selectedFile,
	} = useFileUploadInput(avatarUrl, clearServerError, setValue, trigger, 'avatarUrl');

	useEffect(() => {
		if (user) {
			reset({
				email: user.email,
				fullName: user.fullName,
				avatarUrl: user.avatarUrl,
			});
		}
		if (isEditMode) {
			setPreviewUrl(avatarUrl);
		}
	}, [reset, user, isEditMode, avatarUrl, setPreviewUrl]);

	const onSubmit = (values) => {
		dispatch(updateUserAsync(values)).then((res) => {
			if (res.error) {
				return;
			}
			setPreviewUrl(null);
			setSelectedFile(null);
			setIsEditMode(false);
		});
	};

	const cancelEditMode = (e) => {
		e.preventDefault();

		setSelectedFile(null);
		clearServerError();
		setIsEditMode(false);
	};

	const formError =
		errors?.fullName?.message || errors?.email?.message || errors?.avatarUrl?.message;

	const errorMessage = formError || serverError;

	return (
		<form className={className} onSubmit={handleSubmit(onSubmit)}>
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
						Загрузить
					</Button>
				</div>
			)}
			{previewUrl && <img src={previewUrl} alt="Preview" />}
			<Input
				variant="text"
				id="email"
				label="Почта"
				{...register('email', {
					onChange: clearServerError,
				})}
			/>
			<Input
				variant="text"
				id="fullName"
				label="Полное имя"
				{...register('fullName', {
					onChange: clearServerError,
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
	);
};

export const EditProfileForm = styled(EditProfileFormContainer)`
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-width: 300px;
	margin: 0 auto;

	img {
		width: 300px;
		height: 300px;
		object-fit: cover;
		border-radius: 50%;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		gap: 20px;
	}

	.link-to-auth {
		text-decoration: underline;
	}

	.control-buttons {
		display: flex;
		justify-content: space-between;
		gap: 30px;
	}
`;
