import { useDispatch } from 'react-redux';
import { removeCartItemAsync } from '../../../redux/actions';
import { Icon } from '../../../components';
import styled from 'styled-components';

const ItemRowContainer = ({ className, item, isLoading }) => {
	const dispatch = useDispatch();
	const { id: itemId, quantity, product } = item;
	const { id: productId, title, price, imageUrl } = product;

	const onRemoveCartItem = (itemId) => {
		dispatch(removeCartItemAsync(itemId));
	};

	const sum = price * quantity;

	return (
		<tr className={className}>
			<td>
				<div className="title-block">
					<img src={imageUrl} alt={title} />
					{title}
				</div>
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
					/>
					{quantity}
					<Icon
						id="fa-plus-circle"
						size="28px"
						color="#529940"
						clickable={true}
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

	.quantity-block {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		font-weight: 600;
	}
`;
