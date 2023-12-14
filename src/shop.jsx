import { Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import { Main } from './pages';
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
	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	);
};
