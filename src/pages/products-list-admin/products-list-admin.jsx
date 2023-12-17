import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/slices/ui';
import { fetchProducts } from '../../redux/actions';
import {
	selectCategories,
	selectProducts,
	selectSearch,
	selectSortDirection,
} from '../../redux/selectors';
import { FUNCTION_ID } from '../../redux/constants/function-id';
import { PAGINATION_LIMIT } from '../../constants';
import { generateLoader } from '../../utils';
import { ProductsListLoader } from '../../components/loaders';
import { Button, Container, Icon, Pagination } from '../../components';
import styled from 'styled-components';

const ProductsListAdminContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { products, lastPage, isLoading, error, removeIsLoading, removeError } =
		useSelector(selectProducts);
	const [page, setPage] = useState(1);
	const { value: search, shouldSearch } = useSelector(selectSearch);
	const { active: category } = useSelector(selectCategories);
	const sort = useSelector(selectSortDirection);

	useEffect(() => {
		const params = { search, limit: PAGINATION_LIMIT, page, category, sort };

		dispatch(fetchProducts(params));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, page, shouldSearch, category, sort]);

	const onProductRemove = (productId) => {
		dispatch(
			openModal({
				text: 'Удалить товар?',
				onConfirmId: FUNCTION_ID.REMOVE_PRODUCT_ASYNC,
				onConfirmParams: productId,
			}),
		);
	};

	return (
		<div className={className}>
			<Container>
				<div className="top">
					<Button
						variant="link"
						to="/add-product"
						width="250px"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="20px"
						uppercase={true}
					>
						Добавить товар
					</Button>
				</div>

				<table>
					<thead>
						<tr>
							<th> ID </th>
							<th> Наименование </th>
							<th> Категория </th>
							<th> Стоимость </th>
							<th> Кол-во </th>
							<th> Фото </th>
							<th> Действия </th>
						</tr>
					</thead>
					{isLoading ? (
						generateLoader(9, <ProductsListLoader />)
					) : error ? (
						<div className="error">{error}</div>
					) : (
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>{product.id}</td>
									<td>{product.title}</td>
									<td>{product.categoryId.title}</td>
									<td>{product.price}</td>
									<td>{product.amount}</td>
									<td>{product.imageUrl}</td>
									<td className="controls">
										<Link
											to={
												!removeIsLoading
													? `/add-product/${product.id}`
													: '#'
											}
										>
											<Icon
												id="fa-pencil"
												color={
													!removeIsLoading
														? '#529940'
														: '#cccccc'
												}
												clickable={!removeIsLoading}
											/>
										</Link>
										<Icon
											id="fa-trash"
											margin="0 0 0 25px"
											color={
												!removeIsLoading ? '#ff0000' : '#cccccc'
											}
											clickable={!removeIsLoading}
											onClick={() =>
												!removeIsLoading
													? onProductRemove(product.id)
													: {}
											}
										/>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
				{lastPage > 1 && (
					<Pagination setPage={setPage} page={page} lastPage={lastPage} />
				)}
			</Container>
		</div>
	);
};

export const ProductsListAdmin = styled(ProductsListAdminContainer)`
	.top {
		padding: 10px 0;

		button {
			margin-left: auto;
		}
	}

	table,
	th,
	td {
		border: 1px solid black;
		border-collapse: collapse;
	}

	table {
		width: 100%;
	}

	.controls {
		text-align: center;
	}
`;
