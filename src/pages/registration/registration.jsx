import { Button, Container } from '../../components';
import styled from 'styled-components';

const RegistrationContainer = ({ className }) => {
	const onSubmit = () => {};

	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<Container>
				<form onSubmit={onSubmit}>
					<input type="email" placeholder="Почта" />
					<input type="password" placeholder="Пароль" />
					<input type="password" placeholder="Повтор пароля" />
					<Button
						type="submit"
						width="100%"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="10px"
						uppercase={true}
					>
						Зарегистрироваться
					</Button>
				</form>
			</Container>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	text-align: center;

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-width: 300px;
		margin: 0 auto;

		input {
			padding: 10px 20px;
			border-radius: 5px;
			border: 1px solid #000;
			background: #fff;
		}
	}
`;
