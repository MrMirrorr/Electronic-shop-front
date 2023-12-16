import ContentLoader from 'react-content-loader';
import styled from 'styled-components';

export const SidebarLoaderContainer = ({ className, ...props }) => (
	<li className={className}>
		<ContentLoader
			speed={1}
			width={260}
			height={18}
			viewBox="0 0 280 18"
			backgroundColor="#ccc"
			foregroundColor="#ecebeb"
			{...props}
		>
			<rect x="0" y="0" rx="0" ry="0" width="280" height="18" />
		</ContentLoader>
	</li>
);

export const SidebarLoader = styled(SidebarLoaderContainer)`
	padding: 10px 15px;
	cursor: auto;

	&:hover {
		background-color: inherit;
	}
`;
