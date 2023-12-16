import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../icon/icon';
import { setSortDirection } from '../../redux/slices/ui';
import { selectSearch, selectSortDirection } from '../../redux/selectors';
import { SORT_DIRECTION } from '../../constants';
import styled from 'styled-components';

const TopPanelContainer = ({ className }) => {
	const dispatch = useDispatch();
	const sort = useSelector(selectSortDirection);
	const { value: searchPhrase } = useSelector(selectSearch);

	return (
		<div className={className}>
			{searchPhrase && (
				<div className="left">
					Поиск: <b>{searchPhrase}</b>
				</div>
			)}
			<div className="right">
				<div className="sort-price">
					<span className="label">Цена:</span>
					<span className="buttons">
						<button
							className={`asc${
								sort === SORT_DIRECTION.ASC ? ' selected' : ''
							}`}
							onClick={() => dispatch(setSortDirection(SORT_DIRECTION.ASC))}
						>
							<Icon id="fa-sort-asc" />
						</button>
						<button
							className={`desc${
								sort === SORT_DIRECTION.DESC ? ' selected' : ''
							}`}
							onClick={() =>
								dispatch(setSortDirection(SORT_DIRECTION.DESC))
							}
						>
							<Icon id="fa-sort-desc" />
						</button>
					</span>
				</div>
				<div className="view-mode">
					<span className="label">Отображать:</span>
					<span className="buttons">
						<button className="grid selected">
							<Icon id="fa-th-large" />
						</button>
						<button className="line">
							<Icon id="fa-bars" />
						</button>
					</span>
				</div>
			</div>
		</div>
	);
};

export const TopPanel = styled(TopPanelContainer)`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;

	.left {
		flex-grow: 1;
	}

	.right {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.sort-price,
	.view-mode {
		display: flex;
		align-items: center;
	}

	.buttons {
		margin-left: 5px;
	}

	button {
		width: 35px;
		height: 35px;
		margin-left: 5px;
		color: #d8d8d8;
		background-color: #fff;
		border: 1px solid #d8d8d8;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover:not(.selected) {
			color: #fff;
			background-color: #d8d8d8;
		}

		&.selected {
			background-color: #ffbe79;
		}
	}

	.asc > div {
		position: relative;
		top: 5px;
	}

	.desc > div {
		position: relative;
		top: -5px;
	}
`;
