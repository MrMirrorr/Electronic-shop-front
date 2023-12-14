import { ProductCard } from '../product-card/product-card';
import styled from 'styled-components';

const ProductsCardsContainer = ({ className }) => {
	const { data: products = [], isLoading } = {};

	return (
		<div className={className}>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))
			)}
		</div>
	);
};

export const ProductsCards = styled(ProductsCardsContainer)`
	flex-grow: 1;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
`;
