import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthMe, fetchCart } from './redux/actions';
import {
	AddProduct,
	Authorization,
	Cart,
	Main,
	Product,
	ProductsListAdmin,
	Registration,
	UsersListAdmin,
} from './pages';
import { Footer, Header, Modal } from './components';
import styled from 'styled-components';

const AppColumn = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Page = styled.div`
	flex-grow: 1;
`;

export const Shop = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		// const intervalId = setInterval(() => dispatch(fetchAuthMe()), 60000);
		dispatch(fetchAuthMe()).then(() => dispatch(fetchCart()));
		// return () => clearInterval(intervalId);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/authorization" element={<Authorization />} />
					<Route path="/product/:productId" element={<Product />} />
					<Route path="/products-list-admin" element={<ProductsListAdmin />} />
					<Route path="/add-product" element={<AddProduct />} />
					<Route path="/add-product/:id" element={<AddProduct />} />
					<Route path="/users-list-admin" element={<UsersListAdmin />} />
					<Route path="/cart" element={<Cart />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
