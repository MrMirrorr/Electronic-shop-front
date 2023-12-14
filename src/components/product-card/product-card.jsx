import { Link } from 'react-router-dom';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import styled from 'styled-components';

const ProductCardContainer = ({ className, product }) => {
	const { id, productTitle, productPrice, productAmount, productImageUrl } = product;

	return (
		<div className={className}>
			<div className="image">
				<Link to={`product/${id}`}>
					<img src={productImageUrl} alt={productTitle} />
				</Link>
			</div>
			<div className="card-footer">
				<div className="title">
					<Link to={`product/${id}`}>{productTitle}</Link>
				</div>
				<div className="price">{productPrice} р.</div>
				<div className="amount">Осталось {productAmount} шт.</div>
				<div className="buttons">
					<Button width="35px" height="35px" color="#525864" radius="50%">
						<Icon id="fa-heart" maxHeight="14px" size="14px" />
					</Button>
					<Button
						width="150px"
						height="35px"
						color="#525864"
						fontWeight="600"
						radius="20px"
						uppercase={true}
					>
						В корзину
					</Button>
				</div>
			</div>
		</div>
	);
};

export const ProductCard = styled(ProductCardContainer)`
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
		height: 260px;
		display: flex;
		overflow: hidden;

		img {
			object-fit: contain;
		}
	}

	.card-footer {
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
