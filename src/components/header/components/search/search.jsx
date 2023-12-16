import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setShouldSearch } from '../../../../redux/slices/ui';
import { selectSearch } from '../../../../redux/selectors';
import { debounce } from '../../../../utils';
import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { value } = useSelector(selectSearch);

	const startDelayedSearch = useMemo(
		() => debounce(() => dispatch(setShouldSearch()), 2000),
		[dispatch],
	);

	const onChange = ({ target }) => {
		dispatch(setSearchValue(target.value));
		startDelayedSearch();
	};

	return (
		<div className={className}>
			<Input
				className="search-input"
				type="search"
				value={value}
				onChange={onChange}
				placeholder="Поиск товаров"
			/>
			<div className="icon-wrapper">
				<Icon id="fa-search" color="#fff" />
			</div>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	flex-grow: 1;
	position: relative;

	.search-input {
		width: 100%;
		height: 40px;
		padding: 0 50px 0 15px;
		color: #fff;
		border: 0;
		border-radius: 3px;
		background-color: #999999;
		outline: none;
		box-shadow: none;

		&::placeholder {
			color: #fff;
			text-transform: uppercase;
		}
	}

	.icon-wrapper {
		position: absolute;
		top: 50%;
		right: 20px;
		z-index: 1;
		transform: translateY(-50%);
	}
`;
