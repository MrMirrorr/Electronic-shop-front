import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions';
import {
	selectCategories,
	selectProducts,
	selectSearch,
	selectSortDirection,
} from '../../redux/selectors';
import { generateLoader } from '../../utils';
import { ProductsCardsLoader } from '../loaders';
import { PAGINATION_LIMIT } from '../../constants';
import { Pagination, ProductCard } from '../../components';
import styled from 'styled-components';

const ProductsCardsContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { products, lastPage, isLoading, error } = useSelector(selectProducts);
	const [page, setPage] = useState(1);
	const { value: search, shouldSearch } = useSelector(selectSearch);
	const { active: category } = useSelector(selectCategories);
	const sort = useSelector(selectSortDirection);

	useEffect(() => {
		const params = { search, limit: PAGINATION_LIMIT, page, category, sort };

		dispatch(fetchProducts(params));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, page, shouldSearch, category, sort]);

	return (
		<div className={className}>
			{isLoading ? (
				generateLoader(9, <ProductsCardsLoader />)
			) : error ? (
				<div className="error">{error}</div>
			) : (
				products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))
			)}
			{lastPage > 1 && products.length > 0 && (
				<Pagination setPage={setPage} page={page} lastPage={lastPage} />
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
