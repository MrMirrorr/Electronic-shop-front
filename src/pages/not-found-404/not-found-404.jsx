import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound404Container = ({ className }) => {
	return (
		<div className={className}>
			<h1>404</h1>
			<h2>Not Found</h2>
			<p>
				Такой страницы не существует. Вернуться на <Link to="/">главную</Link>.
			</p>
		</div>
	);
};

export const NotFound404 = styled(NotFound404Container)`
	text-align: center;

	h1 {
		margin: 40px 0;
		font-size: 120px;
	}

	a {
		text-decoration: underline;
	}
`;
