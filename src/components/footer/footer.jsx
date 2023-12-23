import { Container, CoursesWidget, Logo, Socials, WeatherWidget } from '../../components';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	return (
		<div className={className}>
			<Container>
				<div className="footer-block">
					<div>
						<Logo maxWidth="150px" />
						<div className="copyright">
							© Electronic {new Date().getFullYear()}
						</div>
					</div>
					<Socials />
					<CoursesWidget />
					<WeatherWidget />
				</div>
			</Container>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	padding: 10px 0;
	background-color: #ffbe79;
	border-top: 1px solid #8c8c8c;

	.footer-block {
		display: flex;
		justify-content: space-between;
		gap: 30px;
		align-items: center;
	}

	.copyright {
		margin-top: 15px;
	}
`;
