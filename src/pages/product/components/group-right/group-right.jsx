import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItemAsync } from '../../../../redux/actions';
import { selectCartItems } from '../../../../redux/selectors';
import { Button } from '../../../../components';
import styled from 'styled-components';

const GroupRightContainer = ({ className, id, price, amount }) => {
	const dispatch = useDispatch();
	const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
	const cartItems = useSelector(selectCartItems);

	const isInCart = Boolean(cartItems.find((cartItem) => cartItem.product.id === id));

	const onAddToCart = (id) => {
		setIsLoadingAddToCart(true);
		const quantity = 1;
		const itemData = { productId: id, quantity };
		dispatch(addCartItemAsync(itemData)).finally(() => setIsLoadingAddToCart(false));
	};

	return (
		<div className={className}>
			<div className="price">{price} р.</div>
			<div className="buttons">
				<Button
					width="270px"
					height="40px"
					fontSize="14px"
					radius="15px"
					fontWeight="700"
					color="#525864"
					uppercase={true}
					disabled={isLoadingAddToCart || isInCart}
					onClick={() => onAddToCart(id)}
					active={isInCart}
				>
					{isInCart ? 'В корзине' : 'В корзину'}
				</Button>
			</div>
			<div className="amount">
				<span className="label">В наличии: </span>
				{amount} шт.
			</div>
		</div>
	);
};

export const GroupRight = styled(GroupRightContainer)`
	flex-basis: 55%;
	padding-left: 20px;

	.price {
		margin-bottom: 30px;
		font-size: 32px;
		font-weight: 700;
	}

	.buttons {
		margin-bottom: 30px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 15px;
	}
`;
