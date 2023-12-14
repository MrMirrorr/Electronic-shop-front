import { Container, ProductsCards, Sidebar } from '../../components';
import { TopPanel } from '../../components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	return (
		<div className={className}>
			<Container>
				<TopPanel />
				<div className="main-block">
					<Sidebar />
					<ProductsCards />
				</div>
			</Container>
		</div>
	);
};

export const Main = styled(MainContainer)`
	padding: 20px 0;

	.main-block {
		padding-top: 20px;
		display: flex;
		gap: 10px;
	}
`;
