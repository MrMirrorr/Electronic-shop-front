import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItemAsync, removeCartItemAsync } from '../../../redux/actions';
import { Icon } from '../../../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemRowContainer = ({ className, item }) => {
	const dispatch = useDispatch();
	const { id: itemId, quantity, product } = item;
	const { id: productId, title, price, imageUrl } = product;
	const [isLoading, setIsLoading] = useState(false);

	const onRemoveCartItem = (itemId) => {
		setIsLoading(true);
		dispatch(removeCartItemAsync(itemId)).finally(() => setIsLoading(false));
	};

	const onChangeQuantity = (productId, quantity = 1) => {
		setIsLoading(true);
		const itemData = { productId, quantity };
		dispatch(addCartItemAsync(itemData)).finally(() => setIsLoading(false));
	};

	const sum = price * quantity;

	return (
		<tr className={className}>
			<td>
				<Link to={`/product/${productId}`}>
					<div className="title-block">
						{imageUrl ? (
							<img src={imageUrl} alt={title} />
						) : (
							<Icon id="fa-picture-o" size="90px" color="#cccccc" />
						)}
						{title}
					</div>
				</Link>
			</td>
			<td>
				<div className="price-block">{price} р.</div>
			</td>
			<td>
				<div className="quantity-block">
					<Icon
						id="fa-minus-circle"
						size="28px"
						color="#529940"
						clickable={true}
						disabled={isLoading || quantity === 1}
						onClick={() => onChangeQuantity(productId, -1)}
					/>
					{quantity}
					<Icon
						id="fa-plus-circle"
						size="28px"
						color="#529940"
						clickable={true}
						disabled={isLoading}
						onClick={() => onChangeQuantity(productId)}
					/>
				</div>
			</td>
			<td>
				<div className="sum-block">{sum} р.</div>
			</td>
			<td>
				<div className="remove-block">
					<Icon
						id="fa-times-circle"
						size="28px"
						color="#ff0000"
						clickable={!isLoading}
						disabled={isLoading}
						onClick={() => onRemoveCartItem(itemId)}
					/>
				</div>
			</td>
		</tr>
	);
};

export const ItemRow = styled(ItemRowContainer)`
	font-weight: 600;

	.title-block {
		display: flex;
		align-items: center;
		gap: 10px;

		img {
			max-width: 100px;
		}
	}

	.price-block,
	.sum-block {
		white-space: nowrap;
	}

	.quantity-block {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		font-weight: 600;
	}

	.remove-block {
		text-align: center;
	}
`;
