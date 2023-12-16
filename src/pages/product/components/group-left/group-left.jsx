import styled from 'styled-components';

const GroupLeftContainer = ({ className, imageUrl, title }) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
		</div>
	);
};

export const GroupLeft = styled(GroupLeftContainer)`
	flex-basis: 45%;
`;
