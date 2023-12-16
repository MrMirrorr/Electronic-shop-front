import styled from 'styled-components';
import { Button } from '../../../../components';

const GroupRightContainer = ({ className, price, amount }) => {
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
				>
					В корзину
				</Button>
				<Button
					width="270px"
					height="40px"
					fontSize="14px"
					radius="15px"
					fontWeight="700"
					color="#525864"
					uppercase={true}
				>
					Быстрая покупка
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
