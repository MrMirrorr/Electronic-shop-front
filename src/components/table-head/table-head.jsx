import styled from 'styled-components';

const TableHeadContainer = ({ className, children }) => {
	return (
		<thead className={className}>
			<tr>{children}</tr>
		</thead>
	);
};

export const TableHead = styled(TableHeadContainer)``;
