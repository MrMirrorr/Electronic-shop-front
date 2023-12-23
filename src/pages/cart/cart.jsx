import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { resetCart } from '../../redux/slices/cart';
import { fetchCart } from '../../redux/actions';
import { selectCart, selectIsAuth } from '../../redux/selectors';
import { generateLoader } from '../../utils';
import { calculateTotalSum, mapItem } from './utils';
import { createOrder } from '../../api/create-order';
import { AlertError, Button, Container, TableHead } from '../../components';
import { ProductsListLoader } from '../../components/loaders';
import { ItemRow } from './components/item-row';
import styled from 'styled-components';

const CartContainer = ({ className }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cart, items, isLoadingCart, error } = useSelector(selectCart);

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

	const totalSum = calculateTotalSum(items);

	const onCreateOrder = (items, cartId) => {
		const orderData = { products: items.map(mapItem), totalSum };

		createOrder(orderData, cartId).then(() => {
			dispatch(resetCart());
			navigate('/orders');
		});
	};

	const isAuth = useSelector(selectIsAuth);
	if (!isAuth) {
		return (
			<div className={className}>
				<Container>
					<AlertError>
						Чтобы пользоваться корзиной необходимо{' '}
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
				<div className="cart-block">
					<h2>Корзина</h2>
					{error && <AlertError>{error}</AlertError>}
					{isLoadingCart ? (
						<table>{generateLoader(9, <ProductsListLoader />)}</table>
					) : items.length ? (
						<>
							<table>
								<TableHead>
									<th> Товар </th>
									<th> Цена </th>
									<th> Количество </th>
									<th> Сумма </th>
									<th> Удалить </th>
								</TableHead>
								<tbody>
									{items.map((item) => (
										<ItemRow key={item.id} item={item} />
									))}
								</tbody>
							</table>
							<div className="total-price">
								Сумма заказа: <span className="sum">{totalSum} р.</span>
							</div>
							<Button
								className="order-btn"
								width="250px"
								height="35px"
								color="#525864"
								fontWeight="600"
								radius="20px"
								uppercase={true}
								onClick={() => onCreateOrder(items, cart.id)}
							>
								Оформить заказ
							</Button>
						</>
					) : (
						<div className="cart-empty">
							<h3>
								Корзина пустая <span>😕</span>
							</h3>
							<p>
								Вероятней всего, вы не еще ничего не добавили.
								<br />
								Для того, чтобы добавить товар, перейдите на{' '}
								<Link to="/">главную страницу</Link>.
							</p>
							<img
								src={
									process.env.PUBLIC_URL + '/static/img/empty-cart.png'
								}
								alt="Empty cart"
							/>
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export const Cart = styled(CartContainer)`
	table {
		width: 100%;
		border: 0;
		border-collapse: collapse;
		border-spacing: 0 5px;
	}

	th,
	td {
		padding: 5px;
	}

	th {
		text-align: left;
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
		margin: 25px 70px;
		text-align: right;
		font-size: 18px;
		font-weight: 600;

		.sum {
			font-size: 20px;
			font-weight: bold;
		}
	}

	.cart-empty {
		text-align: center;

		img {
			display: inline;
		}

		a {
			text-decoration: underline;
		}
	}

	.order-btn {
		margin-left: auto;
	}

	.link-to-auth {
		text-decoration: underline;
	}
`;
