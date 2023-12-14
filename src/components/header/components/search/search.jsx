import { useState } from 'react';
import { Icon } from '../../..';
import styled from 'styled-components';

const SearchContainer = ({ className }) => {
	const [value, setValue] = useState('');

	const onChangeHandler = ({ target }) => {
		setValue(target.value);
	};

	const onKeyDownHandler = ({ target }) => {
		if ((target.keyCode = 13)) {
			console.log('Pressed Enter');
		}
	};

	const onClickHandler = () => {
		console.log('run search');
	};

	return (
		<div className={className}>
			<input
				className="search-input"
				type="text"
				value={value}
				onChange={onChangeHandler}
				onKeyDown={onKeyDownHandler}
				placeholder="Поиск товаров"
			/>
			<div className="icon-wrapper">
				<Icon
					id="fa-search"
					color="#fff"
					clickable={true}
					onClick={onClickHandler}
				/>
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
