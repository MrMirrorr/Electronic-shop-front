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
	max-width: 240px;
`;
