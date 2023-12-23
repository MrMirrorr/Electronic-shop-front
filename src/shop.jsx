import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, fetchCart, fetchFavorites } from './redux/actions';
import {
	AddProduct,
	Authorization,
	Cart,
	Favorites,
	Main,
	NotFound404,
	Orders,
	Product,
	ProductsListAdmin,
	Profile,
	Registration,
	UsersListAdmin,
} from './pages';
import { selectAuth } from './redux/selectors';
import { Footer, Header, Icon, Modal } from './components';
import styled from 'styled-components';

const AppColumn = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Page = styled.div`
	flex-grow: 1;
	padding-bottom: 15px;
`;

export const Shop = () => {
	const dispatch = useDispatch();
	const { isAuthMeLoading } = useSelector(selectAuth);

	useLayoutEffect(() => {
		dispatch(fetchAuthMe()).then(() => {
			dispatch(fetchCart());
			dispatch(fetchFavorites());
		});
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				{!isAuthMeLoading ? (
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/registration" element={<Registration />} />
						<Route path="/authorization" element={<Authorization />} />
						<Route path="/product/:productId" element={<Product />} />
						<Route
							path="/products-list-admin"
							element={<ProductsListAdmin />}
						/>
						<Route path="/add-product" element={<AddProduct />} />
						<Route path="/add-product/:id" element={<AddProduct />} />
						<Route path="/users-list-admin" element={<UsersListAdmin />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<NotFound404 />} />
					</Routes>
				) : (
					<Icon
						id="fa-refresh fa-spin fa-3x fa-fw"
						margin="50px 0 0 0"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}
					/>
				)}
			</Page>

			<Footer />
			<Modal />
		</AppColumn>
	);
};
