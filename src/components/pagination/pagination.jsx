import { Button } from '..';
import styled from 'styled-components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button
				width="250px"
				height="35px"
				color="#525864"
				fontWeight="400"
				radius="20px"
				disabled={page === 1}
				onClick={() => setPage(1)}
			>
				В начало
			</Button>
			<Button
				width="250px"
				height="35px"
				color="#525864"
				fontWeight="400"
				radius="20px"
				disabled={page === 1}
				onClick={() => setPage((prev) => prev - 1)}
			>
				Предыдущая
			</Button>
			<div className="current-page">
				Страница: {page} из {lastPage}
			</div>
			<Button
				width="250px"
				height="35px"
				color="#525864"
				fontWeight="400"
				radius="20px"
				disabled={page === lastPage}
				onClick={() => setPage((prev) => prev + 1)}
			>
				Следующая
			</Button>
			<Button
				width="250px"
				height="35px"
				color="#525864"
				fontWeight="400"
				radius="20px"
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 0 0 20px;
	padding: 0 35px;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	max-width: 700px;

	button {
		margin: 0 5px;
	}

	.current-page {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 32px;
		margin: 0 5px;
		font-size: 18px;
		font-weight: 500;
		line-height: 1;
		text-align: center;
		border: 1px solid #000;
		border-radius: 10px;
	}
`;
