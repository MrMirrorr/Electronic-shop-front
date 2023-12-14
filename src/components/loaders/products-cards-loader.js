import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const ProductsCardsLoaderContainer = ({ className, ...props }) => (
	<div className={className}>
		<ContentLoader
			speed={1}
			width={260}
			height={430}
			viewBox="0 0 260 430"
			backgroundColor="#ccc"
			foregroundColor="#ecebeb"
			{...props}
		>
			<rect x="0" y="0" rx="10" ry="10" width="260" height="260" />
			<rect x="0" y="270" rx="10" ry="10" width="260" height="55" />
			<rect x="0" y="335" rx="5" ry="5" width="120" height="25" />
			<rect x="140" y="363" rx="5" ry="5" width="120" height="25" />
			<circle cx="17" cy="413" r="17" />
			<rect x="125" y="397" rx="15" ry="15" width="135" height="32" />
		</ContentLoader>
	</div>
);

export const ProductsCardsLoader = styled(ProductsCardsLoaderContainer)`
	padding: 10px;
	border: 1px solid #999;
	background-color: #fff;
`;
