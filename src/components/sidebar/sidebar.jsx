import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetActiveCategory, setActiveCategory } from '../../redux/slices/categories';
import { fetchCategories } from '../../redux/actions';
import { selectCategories } from '../../redux/selectors';
import { generateLoader } from '../../utils';
import { SidebarLoader } from '../loaders';
import { AlertError } from '../../components';
import styled from 'styled-components';

const SidebarContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { categories, isLoading, error, active } = useSelector(selectCategories);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	return (
		<div className={className}>
			<ul>
				<li
					className={!active ? 'selected' : ''}
					onClick={() => dispatch(resetActiveCategory())}
				>
					Все товары
				</li>
				{isLoading ? (
					generateLoader(10, <SidebarLoader />)
				) : error ? (
					<AlertError>{error}</AlertError>
				) : (
					categories &&
					categories.map(({ id, title }) => (
						<li
							className={active === id ? 'selected' : ''}
							key={id}
							onClick={() => dispatch(setActiveCategory(id))}
						>
							{title}
						</li>
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
			padding: 10px 15px;
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
