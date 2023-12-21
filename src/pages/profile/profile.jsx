import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/selectors';
import { AlertError, Container } from '../../components';
import { EditProfileForm, ProfileInfo } from './components';
import styled from 'styled-components';

const ProfileContainer = ({ className }) => {
	const [isEditMode, setIsEditMode] = useState(false);

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
				{isEditMode ? (
					<EditProfileForm
						isEditMode={isEditMode}
						setIsEditMode={setIsEditMode}
					/>
				) : (
					<ProfileInfo setIsEditMode={setIsEditMode} />
				)}
			</Container>
		</div>
	);
};

export const Profile = styled(ProfileContainer)`
	h2 {
		text-align: center;
	}
`;
