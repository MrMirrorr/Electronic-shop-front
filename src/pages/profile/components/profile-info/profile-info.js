import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useSelector } from 'react-redux';
import { selectAuth, selectIsAdmin } from '../../../../redux/selectors';

const ProfileInfoContainer = ({ className, setIsEditMode }) => {
	const isAdmin = useSelector(selectIsAdmin);
	const { user } = useSelector(selectAuth);
	const avatarUrl = user?.avatarUrl;
	const email = user?.email;
	const fullName = user?.fullName;

	return (
		<div className={className}>
			<Icon
				className="edit"
				id="fa-pencil-square fa-2x"
				color="#529940"
				clickable={true}
				onClick={() => setIsEditMode(true)}
			/>
			{avatarUrl ? (
				<img src={avatarUrl} alt="User avatar" />
			) : (
				<Icon id="fa-user-circle-o" margin="0 10px 0 0" size="300px" />
			)}
			{isAdmin && <div className="role">Администратор</div>}
			<div>
				<span className="label">Почта:</span> {email}
			</div>
			<div>
				<span className="label">Полное имя:</span> {fullName}
			</div>
		</div>
	);
};

export const ProfileInfo = styled(ProfileInfoContainer)`
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

	.edit {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 1;
	}

	img {
		width: 300px;
		height: 300px;
		object-fit: cover;
		border-radius: 50%;
	}

	.role {
		color: #ffbe79;
	}

	.label {
		font-style: italic;
	}
`;
