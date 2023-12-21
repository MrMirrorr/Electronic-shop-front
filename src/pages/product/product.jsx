import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/actions';
import { selectProduct } from '../../redux/selectors';
import { generateLoader } from '../../utils';
import { ProductLoader } from '../../components/loaders';
import { AlertError, Container } from '../../components';
import { GroupFooter, GroupHeader, GroupLeft, GroupRight } from './components';
import styled from 'styled-components';

const ProductContainer = ({ className }) => {
	const { productId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProduct(productId));
	}, [dispatch, productId]);

	const {
		product,
		comments,
		isLoadingProduct,
		isLoadingComments,
		errorProduct,
		errorComment,
	} = useSelector(selectProduct);

	return (
		<div className={className}>
			<Container>
				{isLoadingProduct ? (
					generateLoader(1, <ProductLoader />)
				) : errorProduct ? (
					<AlertError>{errorProduct}</AlertError>
				) : product ? (
					<div className="product-block">
						<GroupHeader title={product.title} id={product.id} />
						<GroupLeft imageUrl={product.imageUrl} title={product.title} />
						<GroupRight
							id={product.id}
							price={product.price}
							amount={product.amount}
						/>
						<GroupFooter
							description={product.description}
							comments={comments}
							id={product.id}
							error={errorComment}
							isLoading={isLoadingComments}
						/>
					</div>
				) : null}
			</Container>
		</div>
	);
};

export const Product = styled(ProductContainer)`
	.product-block {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		row-gap: 15px;
	}
`;
