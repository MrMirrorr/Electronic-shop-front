import styled from 'styled-components';
import { Icon } from '../icon/icon';

const TopPanelContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className="sort-price">
				<span className="label">Цена:</span>
				<span className="buttons">
					<button className="asc selected">
						<Icon id="fa-sort-asc" />
					</button>
					<button className="desc">
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
	);
};

export const TopPanel = styled(TopPanelContainer)`
	display: flex;
	justify-content: flex-end;
	gap: 20px;

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
