import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

const ProductsListLoaderContainer = ({ className, ...props }) => (
	<tbody>
		<tr className={className}>
			<td colSpan={7}>
				<ContentLoader
					speed={1}
					width={1175}
					height={25}
					viewBox="0 0 1175 25"
					backgroundColor="#f3f3f3"
					foregroundColor="#e3e3e3"
					{...props}
				>
					<rect x="0" y="0" rx="10" ry="10" width="38" height="25" />
					<rect x="55" y="0" rx="10" ry="10" width="250" height="25" />
					<rect x="340" y="0" rx="10" ry="10" width="170" height="25" />
					<rect x="540" y="0" rx="10" ry="10" width="190" height="25" />
					<rect x="755" y="0" rx="10" ry="10" width="120" height="25" />
					<rect x="895" y="0" rx="10" ry="10" width="85" height="25" />
					<rect x="1000" y="0" rx="10" ry="10" width="165" height="25" />
				</ContentLoader>
			</td>
		</tr>
	</tbody>
);

export const ProductsListLoader = styled(ProductsListLoaderContainer)`
	td {
		padding: 5px 2px 2px;
		background-color: #fff;
		border: 0;
	}
`;
