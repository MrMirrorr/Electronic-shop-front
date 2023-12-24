import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/selectors';
import { Container } from '../../components';
import { EditProfileForm, ProfileInfo } from './components';
import styled from 'styled-components';

const ProfileContainer = ({ className }) => {
	const [isEditMode, setIsEditMode] = useState(false);

	const isAuth = useSelector(selectIsAuth);
	if (!isAuth) {
		return <Navigate to="/" />;
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
