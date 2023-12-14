import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions';
import { selectProducts } from '../../redux/selectors';
import { ProductCard } from '../../components';
import styled from 'styled-components';

const ProductsCardsContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { products, isLoading, error } = useSelector(selectProducts);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return isLoading ? (
		<h1>Loading...</h1>
	) : error ? (
		<h1>{error}</h1>
	) : (
		<div className={className}>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export const ProductsCards = styled(ProductsCardsContainer)`
	flex-grow: 1;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
`;
