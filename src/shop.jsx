import { useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from './redux/actions';
import { Authorization, Main, Product, Registration } from './pages';
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
		dispatch(fetchAuthMe());
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
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
