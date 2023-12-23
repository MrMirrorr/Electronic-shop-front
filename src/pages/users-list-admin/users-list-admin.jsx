import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions';
import { selectIsAdmin, selectUsers } from '../../redux/selectors';
import { generateLoader } from '../../utils';
import { ProductsListLoader } from '../../components/loaders';
import { AlertError, Container, TableHead } from '../../components';
import { UserRow } from './components/user-row';
import styled from 'styled-components';

const UsersListAdminContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { users, roles, isLoading, error, deletionIsLoading, deletionError } =
		useSelector(selectUsers);
	const [updatingError, setUpdatingError] = useState(null);
	const serverError = error || deletionError || updatingError;

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const isAdmin = useSelector(selectIsAdmin);
	if (!isAdmin) {
		return (
			<Container>
				<AlertError>Доступ запрещен</AlertError>
			</Container>
		);
	}

	return (
		<div className={className}>
			<Container>
				{serverError && <AlertError>{serverError}</AlertError>}
				<table>
					<TableHead>
						<th> ID </th>
						<th> Почта </th>
						<th> Полное имя </th>
						<th> Аватар </th>
						<th> Роль </th>
						<th> Действия </th>
					</TableHead>
					{isLoading ? (
						generateLoader(9, <ProductsListLoader />)
					) : (
						<tbody>
							{users.map((user) => (
								<UserRow
									key={user.id}
									user={user}
									roles={roles}
									deletionIsLoading={deletionIsLoading}
									setUpdatingError={setUpdatingError}
								/>
							))}
						</tbody>
					)}
				</table>
			</Container>
		</div>
	);
};

export const UsersListAdmin = styled(UsersListAdminContainer)`
	padding: 10px 0;

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
		text-align: center;
		padding: 5px;
	}

	table {
		width: 100%;
	}

	tbody tr {
		&:nth-child(odd) {
			background-color: #ffffff;
		}
	}
`;
