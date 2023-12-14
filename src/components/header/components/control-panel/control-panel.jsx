import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button } from '../../../../components';
import styled from 'styled-components';

const ControlPanelContainer = ({ className }) => {
	const [visiblePopup, setVisiblePopup] = useState(false);
	const userBlockRef = useRef(null);

	const toggleVisiblePopup = () => setVisiblePopup(!visiblePopup);

	const handleOutsideClick = ({ target }) => {
		if (!userBlockRef.current.contains(target)) {
			setVisiblePopup(false);
		}
	};

	useEffect(() => {
		if (visiblePopup) {
			document.body.addEventListener('click', handleOutsideClick);
			return;
		}

		return () => document.body.removeEventListener('click', handleOutsideClick);
	}, [visiblePopup]);

	const isAuth = true;
	const isAdmin = true;

	return isAuth ? (
		<div className={className}>
			<Link to="favorites" className="favorites-link">
				<Icon id="fa-heart-o" size="32px" clickable={true} />
			</Link>
			<Link to="cart" className="cart-link">
				<Icon id="fa-shopping-basket" size="32px" clickable={true} />
			</Link>
			<div className="user-block" ref={userBlockRef}>
				<Icon
					id="fa-user-circle-o"
					size="32px"
					clickable={true}
					onClick={toggleVisiblePopup}
				/>
				{visiblePopup && (
					<ul className="popup-list">
						{isAdmin && (
							<>
								<li className="popup-list-item">Товары</li>
								<li className="popup-list-item">Пользователи</li>
							</>
						)}
						<li className="popup-list-item">Профиль</li>
						<li className="popup-list-item">Выход</li>
					</ul>
				)}
			</div>
		</div>
	) : (
		<Button
			width="150px"
			height="35px"
			color="#525864"
			fontWeight="600"
			radius="20px"
			uppercase={true}
		>
			Войти
		</Button>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	align-items: center;
	position: relative;

	.favorites-link {
		margin-left: 50px;
		margin-right: 20px;
	}

	.cart-link {
		margin-right: 50px;
	}

	.popup-list {
		list-style-type: none;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 35px;
		right: 0;
		z-index: 1;
		background-color: #fff;
		border-radius: 5px;
		user-select: none;
		overflow: hidden;
		box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

		.popup-list-item {
			padding: 5px 10px;

			&:hover {
				background-color: #eee;
				cursor: pointer;
			}
		}
	}
`;
