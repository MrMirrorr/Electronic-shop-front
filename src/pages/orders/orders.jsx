import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../redux/selectors';
import { getOrders } from '../../api';
import { formatDateString } from '../../utils/format-date-string';
import { generateLoader } from '../../utils';
import { OrdersLoader } from '../../components/loaders';
import { AlertError, Container } from '../../components';
import styled from 'styled-components';

const OrdersContainer = ({ className }) => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		getOrders()
			.then(({ data: { data } }) => setOrders(data))
			.catch(({ error }) => setError(error))
			.finally(() => setIsLoading(false));
	}, []);

	const isAuth = useSelector(selectIsAuth);
	if (!isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<Container>
				<div className="orders-block">
					<h2>Ваши заказы</h2>
					{isLoading ? (
						generateLoader(9, <OrdersLoader />)
					) : error ? (
						<AlertError>{error}</AlertError>
					) : (
						orders.map((order) => (
							<div className="order" key={order.id}>
								<h3>Заказ #{order.id}</h3>
								<div>
									<span className="label">Дата:</span>{' '}
									{formatDateString(order.createdAt)}
								</div>
								<div className="total-sum">
									Итоговая сумма: {order.totalSum} р.
								</div>
								<div className="products">
									{order.products.map((product) => (
										<div className="product" key={product.id}>
											<p>
												<span className="label">Артикул:</span>{' '}
												{product.id}
											</p>
											<p>
												<span className="label">
													Наименование:
												</span>{' '}
												{product.title}
											</p>
											<p>
												<span className="label">Цена:</span>{' '}
												{product.price} р.
											</p>
											<p>
												<span className="label">Количество:</span>{' '}
												{product.quantity} шт.
											</p>
											<p>
												<span className="label">Итого:</span>{' '}
												{product.total} р.
											</p>
										</div>
									))}
								</div>
							</div>
						))
					)}
				</div>
			</Container>
		</div>
	);
};

export const Orders = styled(OrdersContainer)`
	.order {
		margin-bottom: 20px;
		padding: 15px;
		background: #ffffff;
		border-radius: 20px;
	}

	h3 {
		margin-top: 0;
	}

	.products {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		margin-top: 15px;
	}

	.product {
		padding: 15px;
		border: 1px solid #cccccc;
		border-radius: 10px;

		p {
			margin-top: 0;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	.label {
		font-style: italic;
	}

	.total-sum {
		font-weight: bold;
	}
`;
