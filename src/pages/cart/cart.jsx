import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/selectors';
import { generateLoader } from '../../utils';
import { ProductsListLoader } from '../../components/loaders';
import { calculateTotalSum } from './utils/calculate-total-sum';
import { AlertError, Container, TableHead } from '../../components';
import { ItemRow } from './components/item-row';
import styled from 'styled-components';

const CartContainer = ({ className }) => {
	const { items, isLoadingCart, isLoadingItem, error } = useSelector(selectCart);

	const totalSum = calculateTotalSum(items);

	return (
		<div className={className}>
			<Container>
				{error && <AlertError>{error}</AlertError>}
				<div className="cart-block">
					<h2>Корзина</h2>
					<table>
						<TableHead>
							<th> Товар </th>
							<th> Цена </th>
							<th> Количество </th>
							<th> Сумма </th>
							<th> Удалить </th>
						</TableHead>
						{isLoadingCart ? (
							generateLoader(9, <ProductsListLoader />)
						) : (
							<tbody>
								{items.map((item) => (
									<ItemRow
										key={item.id}
										item={item}
										isLoading={isLoadingItem}
									/>
								))}
							</tbody>
						)}
					</table>
					<div className="total-price">
						Сумма заказа: <span className="sum">{totalSum} р.</span>
					</div>
				</div>
			</Container>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	table {
		width: 100%;
		border: 0;
		border-collapse: separate;
		border-spacing: 0 5px;
		text-align: center;
	}

	th,
	td {
		padding: 5px;
	}

	th {
		border-bottom: 1px solid #cccccc;
		border-width: 2px;
	}

	tbody tr {
		&:last-child {
			td {
				border-bottom: 1px solid #cccccc;
				border-width: 2px;
			}
		}

		&:nth-child(odd) {
			background-color: #ffffff;
		}
	}

	.total-price {
		margin: 10px 0;
		text-align: right;
		font-size: 18px;
		font-weight: 600;

		.sum {
			font-size: 20px;
			font-weight: bold;
		}
	}
`;
