import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const ProductLoaderContainer = ({ className, ...props }) => (
	<div className={className}>
		<ContentLoader
			viewBox="0 0 400 160"
			height={160}
			width={400}
			backgroundColor="transparent"
			{...props}
		>
			<circle cx="150" cy="86" r="8" />
			<circle cx="194" cy="86" r="8" />
			<circle cx="238" cy="86" r="8" />
		</ContentLoader>
	</div>
);

export const ProductLoader = styled(ProductLoaderContainer)`
	text-align: center;
`;
