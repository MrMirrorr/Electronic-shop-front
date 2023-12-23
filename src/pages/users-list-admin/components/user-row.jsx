import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../redux/slices/ui';
import { FUNCTION_ID } from '../../../redux/constants/function-id';
import { updateUserRole } from '../../../api';
import { Icon } from '../../../components';
import styled from 'styled-components';

const UserRowContainer = ({
	className,
	user,
	roles,
	deletionIsLoading,
	setUpdatingError,
}) => {
	const dispatch = useDispatch();
	const { id: userId, email, fullName, avatarUrl, roleId: userRoleId } = user;
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const [updatingIsLoading, setUpdatingIsLoading] = useState(false);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = async (userId, newUserRoleId) => {
		setUpdatingIsLoading(true);

		const data = { roleId: newUserRoleId };

		const res = await updateUserRole(userId, data);

		if (res.error) {
			setUpdatingError(res.error);
			setUpdatingIsLoading(false);
		} else {
			setUpdatingError(null);
			setUpdatingIsLoading(false);
			setInitialRoleId(newUserRoleId);
		}
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	const onUserRemove = (userId) => {
		dispatch(
			openModal({
				text: 'Удалить пользователя?',
				onConfirmId: FUNCTION_ID.REMOVE_USER_ASYNC,
				onConfirmParams: userId,
			}),
		);
	};

	return (
		<tr className={className}>
			<td className="id">{userId}</td>
			<td>{email}</td>
			<td>{fullName}</td>
			<td>
				{avatarUrl ? (
					<img className="avatar" src={avatarUrl} alt={fullName} />
				) : (
					<Icon id="fa-user-circle-o" size="50px" />
				)}
			</td>
			<td>
				<select value={selectedRoleId} onChange={onRoleChange}>
					{roles.map(({ id: roleId, name: roleName }) => (
						<option key={roleId} value={roleId}>
							{roleName}
						</option>
					))}
				</select>
			</td>
			<td className="controls">
				<Icon
					id="fa-floppy-o"
					color={!deletionIsLoading ? '#529940' : '#cccccc'}
					clickable={!deletionIsLoading || !updatingIsLoading}
					disabled={
						deletionIsLoading || updatingIsLoading || isSaveButtonDisabled
					}
					onClick={() => onRoleSave(userId, selectedRoleId)}
				/>
				<Icon
					id="fa-trash"
					margin="0 0 0 25px"
					color={!deletionIsLoading ? '#ff0000' : '#cccccc'}
					clickable={!deletionIsLoading || !updatingIsLoading}
					disabled={deletionIsLoading || updatingIsLoading}
					onClick={() => onUserRemove(user.id)}
				/>
			</td>
		</tr>
	);
};

export const UserRow = styled(UserRowContainer)`
	.id {
		max-width: 50px;
		overflow-x: auto;
		white-space: nowrap;
	}

	.controls {
		text-align: center;
	}

	.avatar {
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: 50%;
		display: inline-block;
	}
`;
