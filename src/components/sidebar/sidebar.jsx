import styled from 'styled-components';

const SidebarContainer = ({ className }) => {
	const { data: categories = [], isLoading } = {};

	return (
		<div className={className}>
			<ul>
				<li className="all selected">Все товары</li>
				{isLoading ? (
					<h1>Loading</h1>
				) : (
					categories &&
					categories.map(({ id, categoryName }) => (
						<li key={id}>{categoryName}</li>
					))
				)}
			</ul>
		</div>
	);
};

export const Sidebar = styled(SidebarContainer)`
	flex: 0 0 24%;

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;

		li {
			margin-bottom: 10px;
			padding: 10px 5px 10px 15px;
			border: 1px solid #999;
			cursor: pointer;
			transition: all 0.2s ease-in-out;

			&:hover {
				background-color: #d8d8d8;
			}

			&.selected {
				background-color: #ffbe79;
			}
		}
	}
`;
