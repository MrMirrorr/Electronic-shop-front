import styled from 'styled-components';

const GroupHeaderContainer = ({ className, title, id }) => {
	return (
		<div className={className}>
			<h1>{title}</h1>
			<div className="code">
				<span className="label">Код товара: </span>
				{id}
			</div>
		</div>
	);
};

export const GroupHeader = styled(GroupHeaderContainer)`
	flex-basis: 100%;

	h1 {
		margin: 20px 0 10px;
	}

	.code {
		.label {
			font-weight: 700;
		}
	}
`;
