import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItemAsync, addFavoriteAsync } from '../../redux/actions';
import { selectCartItems, selectFavorites } from '../../redux/selectors';
import { Button, Icon } from '../../components';
import styled from 'styled-components';

const ProductCardContainer = ({ className, product }) => {
	const dispatch = useDispatch();
	const { id, title, price, amount, imageUrl } = product;
	const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
	const [isLoadingAddToFavorite, setIsLoadingAddToFavorite] = useState(false);
	const { favorites } = useSelector(selectFavorites);
	const cartItems = useSelector(selectCartItems);

	const isInFavorite = Boolean(
		favorites.find((favorite) => favorite.product.id === id),
	);

	const isInCart = Boolean(cartItems.find((cartItem) => cartItem.product.id === id));

	const onAddToFavorite = (id) => {
		setIsLoadingAddToFavorite(true);
		dispatch(addFavoriteAsync(id)).finally(() => setIsLoadingAddToFavorite(false));
	};

	const onAddToCart = (id) => {
		setIsLoadingAddToCart(true);
		const quantity = 1;
		const itemData = { productId: id, quantity };
		dispatch(addCartItemAsync(itemData)).finally(() => setIsLoadingAddToCart(false));
	};

	return (
		<div className={className}>
			<div className="image">
				<Link to={`/product/${id}`}>
					{imageUrl ? (
						<img src={imageUrl} alt={title} />
					) : (
						<Icon id="fa-picture-o" size="150px" color="#cccccc" />
					)}
				</Link>
			</div>
			<div className="card-footer">
				<div className="title">
					<Link to={`/product/${id}`}>{title}</Link>
				</div>
				<div className="price">{price} р.</div>
				<div className="amount">Осталось {amount} шт.</div>
				<div className="buttons">
					<Button
						width="35px"
						height="35px"
						color="#525864"
						radius="50%"
						onClick={() => onAddToFavorite(id)}
						disabled={isLoadingAddToFavorite}
						active={isInFavorite}
					>
						<Icon id="fa-heart" maxHeight="14px" size="14px" />
					</Button>
					<Button
						width="150px"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="20px"
						uppercase={true}
						onClick={() => onAddToCart(id)}
						disabled={isLoadingAddToCart || isInCart}
						active={isInCart}
					>
						{isInCart ? 'В корзине' : 'В корзину'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
	max-height: 420px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	border: 1px solid #999;
	background-color: #fff;
	transition: all 0.2s ease-in-out;

	&:hover {
		border-color: #ffbe79;
		box-shadow: 2px 2px 10px 0px rgba(34, 60, 80, 0.2);
	}

	.image {
		height: 50%;

		a {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			img {
				height: 100%;
			}
		}
	}

	.card-footer {
		height: 50%;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-weight: 600;

		.title {
			max-height: 55px;
			margin-bottom: 15px;
			flex-grow: 1;
			overflow: hidden;
			position: relative;
			word-break: break-all;

			&:after {
				content: '';
				display: block;
				width: 100%;
				height: 18px;
				background: linear-gradient(rgba(255, 255, 255, 0) 0%, #ffffff 100%)
					repeat scroll 0 0 rgba(0, 0, 0, 0);
				position: absolute;
				bottom: 0;
				left: 0;
				pointer-events: none;
			}
		}

		.price {
			margin-bottom: 15px;
			font-size: 22px;
			font-weight: 800;
		}

		.amount {
			margin-bottom: 10px;
			text-align: right;
		}

		.buttons {
			display: flex;
			justify-content: space-between;
			gap: 5px;
		}
	}
`;
