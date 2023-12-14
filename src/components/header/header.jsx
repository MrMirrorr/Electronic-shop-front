import { Container } from '../container/container';
import { ControlPanel, Logo, Search } from './components';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
	return (
		<div className={className}>
			<Container>
				<div className="header-block">
					<Logo />
					<Search />
					<ControlPanel />
				</div>
			</Container>
		</div>
	);
};

export const Header = styled(HeaderContainer)`
	padding: 10px 0;
	background-color: #ffbe79;
	border-bottom: 1px solid #8c8c8c;

	.header-block {
		display: flex;
		align-items: center;
		gap: 15px;
	}
`;
