import { Link } from 'react-router-dom';
import logo from './logo.png';
import styled from 'styled-components';

const LogoContainer = ({ className }) => {
	return (
		<div className={className}>
			<Link to="/">
				<img src={logo} alt="Логотип" />
			</Link>
		</div>
	);
};

export const Logo = styled(LogoContainer)`
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '240px')};
	min-width: 150px;
`;
