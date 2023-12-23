import styled from 'styled-components';
import { Icon } from '../icon/icon';

const SocialsContainer = ({ className }) => {
	return (
		<div className={className}>
			<a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
				<Icon id="fa-instagram" clickable={true} color="#ffffff" />
			</a>
			<a href="https://vk.com/" target="_blank" rel="noreferrer">
				<Icon id="fa-vk" clickable={true} color="#ffffff" />
			</a>
			<a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
				<Icon id="fa-facebook-square" clickable={true} color="#ffffff" />
			</a>
			<a href="https://telegram.org/" target="_blank" rel="noreferrer">
				<Icon id="fa-telegram" clickable={true} color="#ffffff" />
			</a>
			<a href="tel:+37377897578" target="_blank" rel="noreferrer">
				<Icon id="fa-mobile" clickable={true} color="#ffffff" />
			</a>
		</div>
	);
};

export const Socials = styled(SocialsContainer)`
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background-color: #999999;
		padding: 5px;
	}
`;
